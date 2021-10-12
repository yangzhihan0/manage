<template>
  <el-container class="home">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img :src="imgurl" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="out">退出</el-button></el-header
    >
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle" @click="toggleCollapse">|||</div>
        <el-menu :default-openeds="arr" :default-active="activePath" router background-color="#545c64" text-color="#fff" active-text-color="#409eff" unique-opened :collapse="isCollapse" :collapse-transition="false">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item of menulist" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subitem.path" v-for="subitem of item.children" :key="subitem.id" @click="saveNavState('/' + subitem.path)">
              <i class="el-icon-menu"></i>
              <span>{{ subitem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      arr: ['0'],
      imgurl: require('../assets/heima.png'),
      menulist: [],
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getMenulist()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    out() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenulist() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.home {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ccc;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
