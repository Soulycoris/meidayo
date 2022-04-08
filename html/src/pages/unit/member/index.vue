<template>
  <ipNav class="unit-nav" leftArrow :border="true" @on-left-click="goBack"> </ipNav>
  <div class="member-profile" :class="group">
    <div class="member-group-bg" :class="group + ' ' + memberDetail.spell"></div>
    <div class="member-pro-area">
      <div class="member-state-box">{{ memberDetail.name }}</div>
      <div class="member-state-box">个人情报</div>
      <div class="member-state-box">
        <div class="member-state-status">
          <div class="member-state-item" v-for="item in ['height', 'weight', 'age']" :key="item">
            <div class="member-state-item-tag">{{}}</div>
            <div class="member-state-item-text">{{ memberDetail[item] }}</div>
          </div>
          <div class="member-state-item">
            <div class="member-state-item-tag">{{}}</div>
            <!-- <div class="member-state-item-text">{{ }}</div> -->
          </div>
          <div class="member-state-item member-state-item-full" v-for="item in ['guild', 'voice', 'favorite']" :key="item">
            <div class="member-state-item-tag">{{}}</div>
            <div class="member-state-item-text">{{ memberDetail[item] }}</div>
          </div>
        </div>
      </div>
      <!-- <div class="member-state-box">{{ memberDetail.selfText }}</div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { groupNameMap } from '@/assets/utils';

const router = useRouter();
const route = useRoute();
let memberId: number = 0;
let memberDetail: memberDetail = reactive<memberDetail>({
  id: 0,
  name: '',
  nikeName: '',
  spell: '',
  url: '',
  age: 0,
  height: 0,
  weight: 0,
  bwh: '',
  birth: '',
  favorite: '',
  school: '',
  voice: '',
  groupName: '',
  selfText: '',
});
const backup = {
  memberDetail: {},
};

const group = computed((): string => groupNameMap.get(memberDetail.groupName) ?? '');

onActivated(() => {
  document.body.scrollIntoView();
  Object.assign(memberDetail, backup.memberDetail);
  memberId = +route.params.memberId;
  if (memberId) {
    getMemberData(memberId);
  }
});
onMounted(() => {
  backup.memberDetail = JSON.parse(JSON.stringify(memberDetail));
});

function getMemberData(id: number) {
  axios
    .get(`/unit/member/${id}`)
    .then((res) => {
      Object.assign(memberDetail, res.data as memberDetail);
    })
    .catch((err) => {
      console.log(err);
    });
}
function goBack() {
  router.go(-1);
}
</script>
<style lang="scss">
.line {
  height: 1px;
  background-color: #333;
}
.member-profile {
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Yu Gothic', 'Microsoft YaHei';
  .member-group-bg {
    height: 200px;
    background-size: 300%;
    &.mna {
      background-image: url('/img/ui/img_group_kv_mna.png');
    }
    &.moon {
      background-image: url('/img/ui/img_group_kv_moon.png');
      &.ktn {
        background-position: 52% 35%;
      }
      &.ngs {
        background-position: 78% 29%;
      }
      &.ski {
        background-position: 60% 0%;
      }
      &.suz {
        background-position: 30% 56%;
      }
      &.mei {
        background-position: 15% 13%;
      }
    }
    &.sun {
      background-image: url('/img/ui/img_group_kv_sun.png');
      &.skr {
        background-position: 45% 35%;
      }
      &.rei {
        background-position: 25% 58%;
      }
      &.hrk {
        background-position: 60% 4%;
      }
      &.chs {
        background-position: 85% 47%;
      }
      &.szk {
        background-position: 16% 15%;
      }
    }
    &.tri {
      background-image: url('/img/ui/img_group_kv_tri.png');
    }
    &.liz {
      background-image: url('/img/ui/img_group_kv_liz.png');
    }
  }
  .member-pro-area {
    margin: 16px;
    border-radius: 4px;
    padding: 16px 12px;
    font-size: 16px;
  }
  .member-unique-equipment {
    width: 100%;
    display: flex;
    align-items: center;
    .member-unique-equipment-img {
      width: 100px;
      height: 100px;
      margin-right: 32px;
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
  .member-equipment {
    width: 100%;
    .member-equipment-img {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        max-width: 100px;
        height: auto;
      }
    }
  }
}
</style>
