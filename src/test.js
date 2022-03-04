// 假设表单提交前要通过俩个校验接口

async function check(ms) { // 模仿异步 
    return new Promise((resolve)=>{
      setTimeout(() => {
          resolve(`check ${ms}`);
      }, ms);
    })
  }
  function check1() {
    console.log('check1');
    return check(1000);
  }
  function check2() {
    console.log('check2');
    return check(2000);
  }
  
  // -------------promise------------
  function submit() {
    console.log('submit');
    // 经过俩个校验 多级关联 promise传值嵌套较深
    check1().then(res1=>{
      check2(res1).then(res2=>{
         /*
          * 提交请求
          */
      })
    })
  }
  submit();