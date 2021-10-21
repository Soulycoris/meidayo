<template>
  <div class="container">
    <el-form :model="form" size="mini" class="form" label-width="50px">
      <el-form-item label="骨骼:">
        <el-select v-model="form.skeleton.value" placeholder="骨骼" @change="eventChange($event, 'skeleton')">
          <el-option :label="item" :value="item" v-for="(item, index) in skeletonsList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动画:">
        <el-select v-model="form.animation.value" placeholder="动画" @change="eventChange($event, 'animation')">
          <el-option :label="item.name" :value="item.name" v-for="(item, index) in animationList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="皮肤:">
        <el-select v-model="form.skin.value" placeholder="皮肤" @change="eventChange($event, 'skin')">
          <el-option :label="item.name" :value="item.name" v-for="(item, index) in skinsList" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed, ref, Ref } from 'vue';
import * as spine from '@esotericsoftware/spine-webgl';
// import name from '../../assets/Spine/name.js';

interface Form {
  skeleton: Ref<string>;
  animation: Ref<string>;
  skins: Ref<string[]>;
  skin: Ref<string>;
}
interface skeletonData {
  skeleton: spine.Skeleton;
  state: spine.AnimationState;
  bounds: {
    offset: spine.Vector2;
    size: spine.Vector2;
  };
  premultipliedAlpha: boolean;
}
interface Skeletons {
  [skeletonName: string]: skeletonData;
}
let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext | null;
let shader;
let batcher;
let mvp = new spine.Matrix4();
let skeletonRenderer;
let assetManager;

let debugRenderer;
let shapes;

let lastFrameTime;
let skeletons: Skeletons = {};
let activeSkeleton = 'mei-idol';
// let activeSkeleton = 'spineboy';
let debugShader;

let form: Form = {
  skeleton: ref('mei-idol'),
  animation: ref('loop_idle'),
  skin: ref('body_FL'),
  skins: ref([]),
};

onMounted(() => {
  init();
});

let skeletonsList: Ref<string[]> = ref([]);
let animationList: Ref<spine.Animation[]> = ref([]);
let skinsList: Ref<spine.Skin[]> = ref([]);

function init() {
  // Setup canvas and WebGL context. We pass alpha: false to canvas.getContext() so we don't use premultiplied alpha when
  // loading textures. That is handled separately by PolygonBatcher.
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  let config = { alpha: false };
  gl = (canvas.getContext('webgl', config) as WebGLRenderingContext | null) || (canvas.getContext('experimental-webgl', config) as WebGLRenderingContext | null);
  if (!gl) {
    alert('WebGL is unavailable.');
    return;
  }

  // Create a simple shader, mesh, model-view-projection matrix, SkeletonRenderer, and AssetManager.
  shader = spine.Shader.newTwoColoredTextured(gl);
  batcher = new spine.PolygonBatcher(gl);
  mvp.ortho2d(0, 0, canvas.width - 1, canvas.height - 1);
  let context = new spine.ManagedWebGLRenderingContext(gl);
  skeletonRenderer = new spine.SkeletonRenderer(context);
  assetManager = new spine.AssetManager(gl, 'spine/');

  // Create a debug renderer and the ShapeRenderer it needs to render lines.
  debugRenderer = new spine.SkeletonDebugRenderer(gl);
  debugRenderer.drawRegionAttachments = true;
  debugRenderer.drawBoundingBoxes = true;
  debugRenderer.drawMeshHull = true;
  debugRenderer.drawMeshTriangles = true;
  debugRenderer.drawPaths = true;
  debugShader = spine.Shader.newColored(gl);
  shapes = new spine.ShapeRenderer(gl);

  // Tell AssetManager to load the resources for each skeleton, including the exported data file, the .atlas file and the .png
  // file for the atlas. We then wait until all resources are loaded in the load() method.
  assetManager.loadText('spineboy.json');
  assetManager.loadTextureAtlas('spineboy.atlas');
  assetManager.loadText('spi_sd_chr_cos_mei-casl-00.json');
  assetManager.loadTextureAtlas('spi_sd_chr_cos_mei-casl-00.atlas');
  assetManager.loadText('spi_sd_chr_cos_mei-idol-01.json');
  assetManager.loadTextureAtlas('spi_sd_chr_cos_mei-idol-01.atlas');

  requestAnimationFrame(load);
}

function load() {
  // Wait until the AssetManager has loaded all resources, then load the skeletons.
  if (assetManager.isLoadingComplete()) {
    skeletons = {
      spineboy: loadSkeleton('spineboy', 'aim', true, 'default'),
      'mei-casl': loadSkeleton('spi_sd_chr_cos_mei-casl-00', 'loop_idle', false, 'body_FL'),
      'mei-idol': loadSkeleton('spi_sd_chr_cos_mei-idol-01', 'loop_idle', false, 'body_FL'),
    };
    setupUI();
    lastFrameTime = Date.now() / 1000;
    requestAnimationFrame(render); // Loading is done, call render every frame.
  } else requestAnimationFrame(load);
}

function loadSkeleton(name: string, initialAnimation: string, premultipliedAlpha = false, skin: string): skeletonData {
  if (skin === undefined) skin = 'default';

  // Load the texture atlas using name.atlas from the AssetManager.
  let atlas = assetManager.require(name + '.atlas');

  // Create an AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
  let atlasLoader = new spine.AtlasAttachmentLoader(atlas);

  // Create a skeleton loader instance for parsing the skeleton data file.
  let skeletonLoader = new spine.SkeletonJson(atlasLoader);

  // Set the scale to apply during parsing, parse the file, and create a new skeleton.
  skeletonLoader.scale = 0.5;
  let assets = assetManager.require(name + '.json');
  let skeletonData = skeletonLoader.readSkeletonData(assets);
  let skeleton = new spine.Skeleton(skeletonData);
  skeleton.setSkinByName(skin);
  let bounds = calculateSetupPoseBounds(skeleton);

  // Create an AnimationState, and set the initial animation in looping mode.
  let animationStateData = new spine.AnimationStateData(skeleton.data);
  let animationState = new spine.AnimationState(animationStateData);

  animationState.setAnimation(0, initialAnimation, true);

  function log(message) {
    // if ($('#debug').is(':checked'))
    console.log(message);
  }
  animationState.addListener({
    start: function (track) {
      log('Animation on track ' + track.trackIndex + ' started');
    },
    interrupt: function (track) {
      log('Animation on track ' + track.trackIndex + ' interrupted');
    },
    end: function (track) {
      log('Animation on track ' + track.trackIndex + ' ended');
    },
    complete: function (track) {
      log('Animation on track ' + track.trackIndex + ' completed');
    },
    event: function (track, event) {
      log('Event on track ' + track.trackIndex + ': ' + JSON.stringify(event));
    },
  });

  // Pack everything up and return to caller.
  return { skeleton, state: animationState, bounds, premultipliedAlpha };
}

function calculateSetupPoseBounds(skeleton) {
  skeleton.setToSetupPose();
  skeleton.updateWorldTransform();
  let offset = new spine.Vector2();
  let size = new spine.Vector2();
  skeleton.getBounds(offset, size, []);
  return { offset: offset, size: size };
}

function eventChange(val: string, tag: string) {
  console.log(val, tag);
  let skeleton = skeletons[activeSkeleton].skeleton;
  let state = skeletons[activeSkeleton].state;
  if (tag === 'animation') {
    skeleton.setToSetupPose();
    state.setAnimation(0, val, true);
  } else if (tag === 'skin') {
    skeleton.setSkinByName(val);
    skeleton.setSlotsToSetupPose();
  } else if (tag === 'skeleton') {
    form.animation.value = '';
    form.skin.value = '';
    activeSkeleton = val;
    setupUI();
  }
}

function setupUI() {
  if (!skeletonsList.value.length) {
    skeletonsList.value = Object.keys(skeletons);
  }

  let skeleton = skeletons[activeSkeleton].skeleton;
  animationList.value.splice(0);
  skinsList.value.splice(0);

  animationList.value.push(...skeleton.data.animations);
  skinsList.value.push(...skeleton.data.skins);
}

function render() {
  let now = Date.now() / 1000;
  let delta = now - lastFrameTime;
  lastFrameTime = now;

  // Update the MVP matrix to adjust for canvas size changes
  resize();

  gl.clearColor(0.3, 0.3, 0.3, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Apply the animation state based on the delta time.
  let skeleton = skeletons[activeSkeleton].skeleton;
  let state = skeletons[activeSkeleton].state;
  let bounds = skeletons[activeSkeleton].bounds;
  let premultipliedAlpha = skeletons[activeSkeleton].premultipliedAlpha;
  state.update(delta);
  state.apply(skeleton);
  skeleton.updateWorldTransform();

  // Bind the shader and set the texture and model-view-projection matrix.
  shader.bind();
  shader.setUniformi(spine.Shader.SAMPLER, 0);
  shader.setUniform4x4f(spine.Shader.MVP_MATRIX, mvp.values);

  // Start the batch and tell the SkeletonRenderer to render the active skeleton.
  batcher.begin(shader);

  skeletonRenderer.vertexEffect = null;
  skeletonRenderer.premultipliedAlpha = premultipliedAlpha;
  skeletonRenderer.draw(batcher, skeleton);
  batcher.end();

  shader.unbind();

  // Draw debug information.
  let debug = true;
  if (debug) {
    debugShader.bind();
    debugShader.setUniform4x4f(spine.Shader.MVP_MATRIX, mvp.values);
    debugRenderer.premultipliedAlpha = premultipliedAlpha;
    shapes.begin(debugShader);
    debugRenderer.draw(shapes, skeleton);
    shapes.end();
    debugShader.unbind();
  }

  requestAnimationFrame(render);
}

function resize() {
  let w = canvas.clientWidth;
  let h = canvas.clientHeight;
  if (canvas.width != w || canvas.height != h) {
    canvas.width = w;
    canvas.height = h;
  }

  // Calculations to center the skeleton in the canvas.
  let bounds = skeletons[activeSkeleton].bounds;
  let centerX = bounds.offset.x + bounds.size.x / 2;
  let centerY = bounds.offset.y + bounds.size.y / 2;
  let scaleX = bounds.size.x / canvas.width;
  let scaleY = bounds.size.y / canvas.height;
  let scale = Math.max(scaleX, scaleY) * 2;
  if (scale < 1) scale = 1;
  let width = canvas.width * scale;
  let height = canvas.height * scale;
  mvp.ortho2d(centerX - width / 2, centerY - height / 2, width, height);
  gl.viewport(0, 0, canvas.width, canvas.height);
}
</script>
<style lang="scss" scope>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.form {
  flex: none;
  padding: 16px;
  .el-form-item--mini .el-form-item__label {
    font-size: 16px;
  }
}
#canvas {
  flex: 1;
}
</style>
