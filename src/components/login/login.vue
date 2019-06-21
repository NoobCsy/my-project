<template>
  <div class="login">
    <div class="content">
      <h2>用户登录</h2>
      <el-form label-width="100px" class="demo-ruleForm" labelPosition="top" :rules="rules" ref="ruleForm" :model="userObj">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="userObj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" @keyup.enter.native="login">
          <el-input type="password" v-model="userObj.password" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="mybtn" @click.prevent="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userObj: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$http({
            url: 'http://localhost:8888/api/private/v1/login',
            method: 'POST',
            data: this.userObj
          }).then(res => {
            let {data, meta} = res.data
            if (meta.status === 200) {
              this.$message.success('登录成功')
              this.$router.push('/home')
              localStorage.setItem('token', data.token)
            } else {
              this.$message.error('登录失败')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    }
  }
}

</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}
.content {
  width: 580px;
  height: 440px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  border-radius: 5px;
  box-sizing: border-box;
}
.mybtn {
  width: 100%;
}
</style>
