<template>
  <div class="character">
    <table class="wikitable mw-collapsible mw-made-collapsible" style="text-align: center">
      <tbody>
        <tr>
          <th colspan="5" style="border-left: solid 1px; border-top: solid 1px; border-right: solid 1px">
            <strong>【<span lang="ja">夢の共演</span>】 川咲さくら</strong>
          </th>
        </tr>
        <!-- <tr>
          <td colspan="5" style="border-left: solid 1px; border-right: solid 1px; border-bottom: solid 1px">2021年6月24日作为初始卡登场</td>
        </tr> -->
        <tr>
          <th colspan="4" style="border-left: solid 1px">卡面</th>
          <th style="border-right: solid 1px">头像</th>
        </tr>
        <tr>
          <td colspan="4" style="border-left: solid 1px; border-bottom: solid 1px">
            <!-- <img style="width: 720px" src="/img/card/full/img_card_full_1_skr-05-idol-00.png" />  -->
            <!-- <img style="width: 400px" src="https://as.lovelive.eu.org/images_b95/88423.png" /> -->
          </td>
          <td style="border-right: solid 1px; border-bottom: solid 1px">
            <!-- <img style="width: 100px" src="/img/card/thumb/img_card_thumb_1_skr-05-idol-00.png" /> -->
            <!-- <img style="width: 100px" src="/assets/icon/201073001_2.png" /> -->
          </td>
        </tr>
        <tr>
          <th rowspan="2" style="border-left: solid 1px; border-right: 1px solid var(--border-color-base); border-bottom: solid 1px">总和</th>
          <th width="120" style="border-right: 1px solid var(--border-color-base)">
            <div class="maskedimage maskedimage-vocal"></div>
          </th>
          <th width="120" style="border-right: 1px solid var(--border-color-base)">
            <div class="maskedimage maskedimage-dance"></div>
          </th>
          <th width="120" style="border-right: 1px solid var(--border-color-base)">
            <div class="maskedimage maskedimage-visual"></div>
          </th>
          <th width="120" style="border-right: solid 1px">
            <div class="maskedimage maskedimage-stamina"></div>
          </th>
        </tr>
        <tr>
          <th width="120" style="border-right: 1px solid var(--border-color-base); border-bottom: solid 1px">
            <div>151235</div>
          </th>
          <th width="120" style="border-right: 1px solid var(--border-color-base); border-bottom: solid 1px">
            <div>123135</div>
          </th>
          <th width="120" style="border-right: 1px solid var(--border-color-base); border-bottom: solid 1px">
            <div>131235</div>
          </th>
          <th width="120" style="border-right: solid 1px; border-bottom: solid 1px">
            <div>3456</div>
          </th>
        </tr>
        <tr>
          <th style="border-left: solid 1px; border-bottom: solid 1px">类型</th>
          <td style="border-bottom: solid 1px">得分</td>
          <th style="border-bottom: solid 1px">初期稀有度</th>
          <td colspan="2" style="border-right: solid 1px; border-bottom: solid 1px">5</td>
        </tr>
        <tr>
          <th style="border-left: solid 1px">技能信息</th>
          <th>图标</th>
          <th>名称</th>
          <th colspan="2" style="border-right: solid 1px">效果</th>
        </tr>
        <tr>
          <th style="border-left: solid 1px">SP</th>
          <td>
            <skillGenerate :scale="0.5" skill-level="" skill-type="SP" skill-bg="bg_special_2" skill1="img_icon_skill_sk-skr-05-idol-00-1" skill2="" skill3=""></skillGenerate>
          </td>
          <td><span lang="ja">太陽の光と共に</span></td>
          <td colspan="2" style="border-right: solid 1px">1550%のスコア獲得、強化効果が多い程効果上昇<br />スタミナ:497</td>
        </tr>
        <tr>
          <th style="border-left: solid 1px">A</th>
          <td>
            <skillGenerate :scale="0.5" skill-level="" skill-type="A" skill-bg="bg_strength_2" skill1="img_icon_skill-normal_vocal-up" skill2="img_icon_skill-normal_score-get" skill3=""></skillGenerate>
          </td>
          <td><span lang="ja">大好きなあのキャラ</span></td>
          <td colspan="2" style="border-right: solid 1px">430%のスコア獲得<br />自身に9段階ボーカル上昇効果[25ビート]<br />スタミナ:148 CT:30</td>
        </tr>
        <tr>
          <th style="border-left: solid 1px">P</th>
          <td>
            <skillGenerate :scale="0.5" skill-level="5" skill-type="P" skill-bg="bg_strength_1" skill1="img_icon_skill-normal_vocal-up" skill2="img_icon_skill-normal_score-get" skill3=""></skillGenerate>
          </td>
          <td><span lang="ja">人生の倍返し</span></td>
          <td colspan="2" style="border-right: solid 1px">100コンボ以上時<br />120%のスコア獲得<br />自身に8段階ボーカル上昇効果[32ビート]<br />スタミナ:378 ライプ中1回のみ</td>
        </tr>
        <tr>
          <th style="border-left: solid 1px; border-bottom: solid 1px">Y</th>
          <td style="border-bottom: solid 1px">
            <skillGenerate :scale="0.5" skill-level="" skill-type="Y" skill-bg="bg_yell_1" skill1="img_icon_skill-normal_vocal-down" skill2="" skill3=""></skillGenerate>
          </td>
          <td style="border-bottom: solid 1px"><span lang="ja">ボーカルアップ</span></td>
          <td colspan="2" style="border-right: solid 1px; border-bottom: solid 1px">ボーカル2%上昇</td>
        </tr>
        <tr>
          <th style="border-left: solid 1px; border-bottom: solid 1px">衣装</th>
          <th style="border-bottom: solid 1px">
            <img style="width: 64px" src="/img/card/thumb/img_cos_thumb_skr-idol-00.png" />
          </th>
          <td colspan="3" style="border-right: solid 1px; border-bottom: solid 1px"><span lang="ja">アセンブルハーモニー</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import skillGenerate from '@components/skillGenerate/skillGenerate.vue';
</script>

<style lang="scss">
:root {
  --color-base-vocal: #ff4b9d;
  --color-base-dance: #38bbff;
  --color-base-visual: #ffb100;
  --color-base-stamina: #99dc66;
  --background-color-quiet--hover: rgba(0, 0, 0, 0.07000000000000001);
  --background-color-quiet--active: rgba(0, 0, 0, 0.09);
  --color-base: #54595d;
  --color-base--emphasized: #202122;
  --color-base--subtle: #72777d;
  --border-color-base: rgba(0, 0, 0, 0.05);
  --border-color-base--lighter: rgba(0, 0, 0, 0.02);
  --border-color-base--darker: rgba(0, 0, 0, 0.08);
}

table.wikitable {
  border: 0;
  background-color: transparent;
  border-collapse: collapse;
  color: var(--color-base);
  text-align: left;
}

table.wikitable caption {
  margin-top: 0.8rem;
  font-weight: 600;
  text-align: left;
}

table.wikitable tr {
  vertical-align: top;
}

table.wikitable tr th {
  background-color: transparent;
  color: var(--color-base--subtle);
  font-size: 0.8125rem;
  font-weight: 500;
}

table.wikitable tr td {
  font-size: 0.875rem;
}

table.wikitable tr th,
table.wikitable tr td {
  padding: 10px 20px 10px 0;
  border: 0;
  border-bottom: 1px solid var(--border-color-base);
}

table.wikitable tr:hover {
  background-color: var(--background-color-quiet--hover);
}

table.wikitable .generate-area {
  // width: 64px;
  // height: 64px;
  // transform: scale(0.5);
}

.maskedimage {
  display: inline-block;
  width: 32px;
  height: 32px;
  mask-mode: alpha;
  mask-size: cover;
}

.maskedimage-vocal {
  mask-image: url('/img/icon/icon_parameter_vocal.png');
  background-color: var(--color-base-vocal);
}
.maskedimage-dance {
  mask-image: url('/img/icon/icon_parameter_dance.png');
  background-color: var(--color-base-dance);
}
.maskedimage-visual {
  mask-image: url('/img/icon/icon_parameter_visual.png');
  background-color: var(--color-base-visual);
}
.maskedimage-stamina {
  mask-image: url('/img/icon/icon_parameter_stamina.png');
  background-blend-mode: match-source;
  background-color: var(--color-base-stamina);
}

table.wikitable tr {
  vertical-align: middle;
}
</style>
