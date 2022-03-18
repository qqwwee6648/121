function getNow(){
	var fillZero=function f1(str) {
    var realNum;
    if (str < 10) {
        realNum = '0' + str;
    } else {
        realNum = str;
    }
    return realNum;
}
  return(fillZero(new Date().getHours()) + ':' + fillZero(new Date().getMinutes()) + ':' + fillZero(new Date().getSeconds())+ '  ' +  ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][new Date().getDay()] + '  ')
}




Prx=function Printx(x){
var display=document.getElementById("SocketMessageData").style.display;
if(display=="none"){
document.getElementById("SocketConn").innerHTML =document.getElementById("SocketConn").innerHTML.replace('[关闭]','')+'[关闭]'
document.getElementById("SocketMessageData").style.display="block";
document.getElementById("SocketMessage").style.height="300px";
}
document.getElementById("SocketMessageData").innerHTML='<span style="font-size:13px;color:#58d7af">'+getNow()+'新</span>'+'<span style="font-size:13px;">'+x+'</span>'+"<br>"+document.getElementById("SocketMessageData").innerHTML;

}


function dobet(addbetData, val, money) {
  console.info('addbetData :: ' + addbetData);
  window.SufaGlobal[1]++;
  Prx(JSON.stringify(window.SufaGlobal));
  if (window.SufaGlobal[1]-window.SufaGlobal[2]>5){location.reload()};
  try {
    ns_betslipcorelib_util.BetsWebApi.AddBet({
      betRequestCorrelation: '',
      casts: '',
      normals: addbetData,
      completeHandler: function (obj) {
        try {
          console.info('begin placebet...' + JSON.stringify(val.data))
          Prx(JSON.stringify(val.data));
          let rm = parseInt(money) * getOd(obj.bt[0].od)
          let placeBetData = `pt=N#o=${ obj.bt[0].od }#f=${ obj.bt[0].fi }#fp=${ obj.bt[0].pt[0].pi }#so=#c=1#sa=${ val.data.SA }#ln=${ val.data.HA }#mt=11#oto=2#|TP=${ val.data.IT }x2x3#ust=${ money }#st=${ money }#tr=${ rm }#||`
          console.info('placebet : ' + placeBetData)
          let data = {
            normals: placeBetData,
            casts: '',
            multiples: '',
            completeHandler: function (t) {
              Prx(JSON.stringify({name: '投注完成',message: t}));
              console.info(JSON.stringify({
                name: '投注完成',
                message: t
              }))
              try {
                if (t.mi == 'allow_login_verification' || t.mi == 'stakes_above_max_stake' ) {
                  var srzzzz = '封|封|封|封|封||' + window.Locator.user._balance.withdrableBalance + '|' + window.Locator.user.username;
                  console.log('封号')
                  window.HeaderGlobal['ws'].send(JSON.stringify(['msg1',
                  srzzzz,
                  window.Locator.user._balance._sessionToken]));
                }
                var res_1 = t;
                var srzzzz = res_1['la'][0]['fd'] + '|' + res_1['la'][0]['ak'] + '|' + res_1['bt'][0]['pt'][0]['ha'] + '|' + res_1['bt'][0]['od'] + '|' + res_1['ts'] + '|' + '|' + window.Locator.user._balance.withdrableBalance + '|' + window.Locator.user.username;
            window.SufaGlobal[0]++;    
            window.SufaGlobal[2]=window.SufaGlobal[1]; 
window.HeaderGlobal['ws'].send(JSON.stringify(['msg1',
                srzzzz,
                window.Locator.user._balance._sessionToken]));
              } 
              catch (err) {
                console.info(err);
              }
            },
            errorHandler: function () {
              console.info(JSON.stringify({
                name: '投注错误',
                message: 'err'
              }))
            },
            betGuid: obj.bg,
            betRequestCorrelation: encodeURIComponent(obj.cc),
            participantCorrelation: obj.pc,
          }
          let nbu = null;
          if (typeof ns_betslipstandardlib_util != 'undefined') {
            nbu = ns_betslipstandardlib_util
          }
          if (typeof ns_betslipstandardlegacylib_util != 'undefined') {
            nbu = ns_betslipstandardlegacylib_util
          }
          nbu.APIHelper.PlaceBet(data)
        } catch (err) {
          console.info(err.message)
        }
      },
      errorHandler: function () {
        console.info('add bet error')
      },
    })
  } catch (e) {
    console.info(e.message + ' | ')
  }
}
function getOd(od) {
  let ods = od.split('/')
  let odv = parseInt(ods[0]) / parseInt(ods[1])
  return 1 + odv;
}
