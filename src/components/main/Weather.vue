<template>
  <div v-if="this.hasError" class="card my-2 rounded-0 border-0 border-bottom weather text-center">
    <div class="m-4 d-flex justify-content-center">
      <h6 class="p-3 text-muted">요청시간이 만료되었습니다. 다시 로딩해주세요</h6>
      <div class="text-muted">
          <img :src="reloadIcon" @click="this.callReload()" width="40" height="40" class="me-1" style="cursor: pointer;" />
      </div>
    </div>
  </div>
  <div v-else-if="this.isLoading" class="card my-2 rounded-0 border-0 border-bottom weather text-center" style="height: 285px;">
    <div class="card-body">
      <div class="spinner-border text-secondary" role="status" style="margin: 29.99999%;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else class="card my-2 rounded-0 border-0 border-bottom weather text-center" style="height: 285px;">
    <div class="card-body p-4">
      <div class="card-text mb-3" style="font-weight: bold; font-size: 1.25rem;">{{ weatherItem.location }}</div>
      <span>
        <img :src="this.skyTransfer()" class="mb-4 me-2" width="70" height="70">
        <span class="mt-2" style="font-size: 3rem; font-weight: bolder;">{{ weatherItem.TMP }}℃</span>
      </span>
      <p class="card-text">
        <small class="me-3">초미세먼지: {{ dustGradeTransfer(weatherItem.dustGrade) }}({{ weatherItem.dustValue }})</small>
        <img :src="umbrella" class="mb-1" />
        {{ weatherItem.POP }}%
      </p>
      <small class="text-muted">
        <img :src="reloadIcon" @click="this.callReload()" width="15" height="15" class="me-1" style="cursor: pointer;" />
        업데이트
      </small>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sun from '@/assets/icon/weather/sun.svg'
import cloudSun from '@/assets/icon/weather/cloud-sun.svg'
import clouds from '@/assets/icon/weather/clouds.svg'
import cloudRain from '@/assets/icon/weather/cloud-rain.svg'
import cloudSnow from '@/assets/icon/weather/cloud-snow.svg'
import cloudSleet from '@/assets/icon/weather/cloud-sleet.svg'
import umbrella from '@/assets/icon/weather/umbrella-fill.svg'
import reloadIcon from '@/assets/icon/common/arrow-repeat.svg'


export default {
  props: {
    reload: Function
  },
  data() {
    return {
      GPSx: 0,
      GPSy: 0,
      nx: 0,
      ny: 0,
      weatherItem:
      {
        TMP: 0,
        SKY: 0,
        POP: 0,
        PTY: 0,
        location: '',
        dustGrade: 0,
        dustValue: 0,
      },
      isLoading: true,
      hasError: false,
      sun: sun,
      cloudSun: cloudSun,
      clouds: clouds,
      cloudRain: cloudRain,
      cloudSnow: cloudSnow,
      cloudSleet: cloudSleet,
      umbrella: umbrella,
      reloadIcon: reloadIcon,
    }
  },
  mounted() {
    this.getGeoInfo()
  },
  methods: {
    getGeoInfo() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.GPSx = position.coords.latitude
            this.GPSy = position.coords.longitude
            console.log("NX, NY " + this.GPSx + " / " + this.GPSy)
            this.performLccDfsConversion()
            this.getWeatherInfo()
          },
          error => {
            if (error.code === error.PERMISSION_DENIED) {
              // 위치정보 요청 거부시 서울로 설정
              this.GPSx = 37.56356944444444;
              this.GPSy = 126.98000833333333;
              this.performLccDfsConversion()
              this.getWeatherInfo()
            } else {
              console.error("오류 발생: " + error.message);
            }
          }
        );
      } else {
        alert("브라우저에서 위치정보 제공을 지원하지 않습니다.");
      }
    },
    getWeatherInfo() {
      this.hasError = false;
      if (sessionStorage.getItem('weatherItem') !== null) {
        console.log('세션스토리지 로딩')
        this.weatherItem = JSON.parse(sessionStorage.getItem('weatherItem'))
        this.isLoading = false
      }
      if (sessionStorage.getItem('weatherItem') === null) {
        const data =
        {
          "nx": this.nx,
          "ny": this.ny,
        }
        axios.post(`/api/weather`, data, { headers: { "Content-Type": `application/json`, } })
          .then(response => {
            const responseData = response.data.response.body.items.item;
            const filterByTime = responseData.filter(item => item.fcstTime === this.getWeatherTime())
            this.filterByCategory(filterByTime)
          })
          .catch(error => {
            this.isLoading = false;
            this.hasError = true;
            console.log(error)
          })
        axios.post(`/api/location`, data, { headers: { "Content-Type": `application/json`, } })
          .then(response => {
            this.weatherItem.location = response.data.adress1
            this.getDustInfo()
          })
          .catch(error => {
            this.isLoading = false;
            this.hasError = true;
            console.log(error)
          })
      }
    },
    getDustInfo() {
      const data =
      {
        sidoName: this.weatherItem.location
      }
      console.log("시도명: " + this.weatherItem.location)
      axios.post(`/api/dust`, data, { headers: { "Content-Type": `application/json`, } })
          .then(response => {
            const responseData = response.data.response.body.items[0];
            this.weatherItem.dustGrade = JSON.parse(responseData.pm25Grade1h);
            this.weatherItem.dustValue = JSON.parse(responseData.pm25Value)
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false;
            this.hasError = true;
            console.log(error)
          })
    },
    filterByCategory(filterByTime) {
      // 현재 기온
      this.weatherItem.TMP = JSON.parse(filterByTime.filter(item => item.category === 'TMP').map(item => item.fcstValue))
      // 하늘 상태: 맑음(1), 구름많음(3), 흐림(4)
      this.weatherItem.SKY = JSON.parse(filterByTime.filter(item => item.category === 'SKY').map(item => item.fcstValue))
      // 강수확률
      this.weatherItem.POP = JSON.parse(filterByTime.filter(item => item.category === 'POP').map(item => item.fcstValue))
      // 강수형태: 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 
      this.weatherItem.PTY = JSON.parse(filterByTime.filter(item => item.category === 'PTY').map(item => item.fcstValue))
      sessionStorage.setItem('weatherItem', JSON.stringify(this.weatherItem))
    },
    skyTransfer() {
      // 변환
      // 맑음(1), 구름많음(3), 흐림(4), 비,소나기,(5) 비/눈(6), 눈(7), 
      const SKY = this.weatherItem.SKY
      const PTY = this.weatherItem.PTY
      switch (PTY) {
        case 1:
        case 4:
          return this.cloudRain;
        case 2:
          return this.cloudSleet;
        case 3:
          return this.cloudSnow;
      }
      switch (SKY) {
        case 1:
          return this.sun;
        case 3:
          return this.cloudSun;
        case 4:
          return this.clouds
        default:
          return this.sun
      }
    },
    dustGradeTransfer(grade) {
      switch (grade) {
        case 1:
          return "좋음"
        case 2:
          return "보통"
        case 3:
          return "나쁨"
        case 4:
          return "매우나쁨"
        default:
          return ""
      }
    },
    getWeatherTime() {
      let date = new Date();
      let hour = date.getHours();

      if (hour < 10) {
        hour = "0" + hour;
      }
      return hour + "00";
    },
    performLccDfsConversion() {
      const code = "toXY";
      const result = this.dfs_xy_conv(code, this.GPSx, this.GPSy);
      this.nx = JSON.stringify(result.x)
      this.ny = JSON.stringify(result.y)
    },
    callReload() {
      this.reload();
    },
    dfs_xy_conv(code, v1, v2) {

      var RE = 6371.00877; // 지구 반경(km)
      var GRID = 5.0; // 격자 간격(km)
      var SLAT1 = 30.0; // 투영 위도1(degree)
      var SLAT2 = 60.0; // 투영 위도2(degree)
      var OLON = 126.0; // 기준점 경도(degree)
      var OLAT = 38.0; // 기준점 위도(degree)
      var XO = 43; // 기준점 X좌표(GRID)
      var YO = 136; // 기1준점 Y좌표(GRID)

      var DEGRAD = Math.PI / 180.0;
      var RADDEG = 180.0 / Math.PI;

      var re = RE / GRID;
      var slat1 = SLAT1 * DEGRAD;
      var slat2 = SLAT2 * DEGRAD;
      var olon = OLON * DEGRAD;
      var olat = OLAT * DEGRAD;

      var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
      sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
      var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
      sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
      var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
      ro = re * sf / Math.pow(ro, sn);
      var rs = {};
      if (code == "toXY") {
        rs['lat'] = v1;
        rs['lng'] = v2;
        var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        var theta = v2 * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
      }
      else {
        rs['x'] = v1;
        rs['y'] = v2;
        var xn = v1 - XO;
        var yn = ro - v2 + YO;
        ra = Math.sqrt(xn * xn + yn * yn);
        if (sn < 0.0) - ra;
        var alat = Math.pow((re * sf / ra), (1.0 / sn));
        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

        if (Math.abs(xn) <= 0.0) {
          theta = 0.0;
        }
        else {
          if (Math.abs(yn) <= 0.0) {
            theta = Math.PI * 0.5;
            if (xn < 0.0) - theta;
          }
          else theta = Math.atan2(xn, yn);
        }
        var alon = theta / sn + olon;
        rs['lat'] = alat * RADDEG;
        rs['lng'] = alon * RADDEG;
      }
      return rs;
    },
  }
}

</script>

<style scoped>
.app {
  background-color: #f4f6f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

body {
  font-family: "TmoneyRoundWindRegular", "TmoneyRoundWindExtraBold";
  display: block;
  margin: 0;
}

/* Container styles */
.wrap_main {
  flex: 1;
  margin: 0 10px 0 10px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.box:first-child {
  background-color: #ADD8E6;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.box {
  position: relative;
  background-color: #fff;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.box_title {
  margin: 0;
  font-size: 25px;
  width: 80px;
  white-space: nowrap;
  font-weight: bold;
  width: 80px;
  padding: 10px 0px;
}

.box-text {
  margin: 0;
  font-size: 16px;
}

.box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.my_hover {
  color: #000;
  text-decoration: none;
}

.my_hover:hover {
  color: #555;
  text-decoration: underline;
}
</style>