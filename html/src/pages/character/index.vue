<template>
  <div class="character">
    <table class="wikitable mw-collapsible mw-made-collapsible" style="text-align: center">
      <tbody>
        <tr>
          <th colspan="5" style="border-left: solid 1px; border-top: solid 1px; border-right: solid 1px">
            <strong>No. 1 【<span lang="ja">夢の共演</span>】 川咲さくら</strong>
          </th>
        </tr>
        <tr>
          <td colspan="5" style="border-left: solid 1px; border-right: solid 1px; border-bottom: solid 1px">2021年6月24日作为初始卡登场</td>
        </tr>
        <tr>
          <th colspan="4" style="border-left: solid 1px">卡面</th>
          <th style="border-right: solid 1px">头像</th>
        </tr>
        <tr>
          <td colspan="4" style="border-left: solid 1px; border-bottom: solid 1px">
            <!-- <img style="width: 960px" src="/img/card/full/img_card_full_1_skr-05-idol-00.png" />  -->
            <!-- <img style="width: 400px" src="https://as.lovelive.eu.org/images_b95/88423.png" /> -->
          </td>
          <td style="border-right: solid 1px; border-bottom: solid 1px">
            <img style="width: 100px" src="/img/card/thumb/img_card_thumb_1_skr-05-idol-00.png" />
            <!-- <img style="width: 100px" src="/assets/icon/201073001_2.png" /> -->
          </td>
        </tr>
        <tr>
          <th style="border-left: solid 1px">总和</th>
          <th width="120"><div class="maskedimage maskedimage-vocal"></div><div>151235</div></th>
          <th width="120"><div class="maskedimage maskedimage-dance"></div><div>123135</div></th>
          <th width="120"><div class="maskedimage maskedimage-visual"></div><div>131235</div></th>
          <th width="120" style="border-right: solid 1px"><div class="maskedimage maskedimage-stamina"></div><div>3456</div></th>
        </tr>
        <tr>
          <th style="border-left: solid 1px; border-bottom: solid 1px">是否为暴击卡</th>
          <td style="border-bottom: solid 1px">否</td>
          <th style="border-bottom: solid 1px">初始合宿技能槽数</th>
          <td style="border-bottom: solid 1px">2</td>
          <td style="border-right: solid 1px; border-bottom: solid 1px">4</td>
        </tr>
        <tr>
          <th style="border-left: solid 1px">技能信息</th>
          <th>图标</th>
          <th>名称</th>
          <th colspan="2" style="border-right: solid 1px">效果</th>
        </tr>
        <tr>
          <th style="border-left: solid 1px">SP</th>
          <td><img style="width: 32px" src="https://as.lovelive.eu.org/images_b95/26.png" /></td>
          <td><span lang="ja">願いが届くといいな♪</span></td>
          <td colspan="2" style="border-right: solid 1px">获得相当于自身Stamina的28%/31%/34%/37%/40%的盾<br />发动概率：33%</td>
        </tr>
        <tr>
          <th style="border-left: solid 1px">P</th>
          <td><img style="width: 32px" src="https://as.lovelive.eu.org/images_b95/316.png" /></td>
          <td><span lang="ja">スタミナ＋ :全員</span></td>
          <td colspan="2" style="border-right: solid 1px">基本Stamina增加3%/3.3%/3.6%/3.9%/4.2%（对象：全员）</td>
        </tr>
        <tr>
          <th style="border-left: solid 1px; border-bottom: solid 1px">P</th>
          <td style="border-bottom: solid 1px"><img style="width: 32px" src="https://as.lovelive.eu.org/images_b95/706.png" /></td>
          <td style="border-bottom: solid 1px"><span lang="ja">スタミナ回復 :アピール時</span></td>
          <td colspan="2" style="border-right: solid 1px; border-bottom: solid 1px">回复相当于自身Stamina的10%的体力<br />条件：自身点击时；发动概率：20%</td>
        </tr>
        <tr>
          <th style="border-left: solid 1px; border-bottom: solid 1px">可解锁的衣装</th>
          <th style="border-bottom: solid 1px"><img style="width: 64px" src="https://as.lovelive.eu.org/images_b95/481136.png" /></th>
          <td style="border-bottom: solid 1px"><span lang="ja">楽園からの使者</span></td>
          <th style="border-bottom: solid 1px"><img style="width: 64px" src="https://as.lovelive.eu.org/images_b95/194797.png" /></th>
          <td style="border-right: solid 1px; border-bottom: solid 1px"><span lang="ja">楽園からの使者[Y]</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts"></script>
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
