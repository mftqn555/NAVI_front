<template>
    <div class="card subway_card rounded-0 border-0 border-bottom">
        <div class="card-body">
            <span class="h5 card-title mb-3" style="font-weight: 700;">
                <span>🚉 전국 지하철 도착정보</span>
                <a href="#" class="btn btn-secondary btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#subway">검색</a>
            </span>
            <span class="input-group input-group-sm my-3" style="max-width: 70%;">
                <span class="input-group-text rounded-0">최근검색기록</span>
                <select class="form-select" @change="getStationInfoByStored($event)">
                    <option v-if="!this.isChanged" :selected="true">선택하기</option>
                    <option v-for="(info, idx) in storedInfo" :key="idx" :value="JSON.stringify(info)">
                        {{ info.subwayStationName + '(' + info.subwayRouteName + ')' }}
                    </option>
                </select>
                <button @click="clickInit()" class="btn btn-outline-secondary ms-3 rounded-0" type="button" id="button-addon2">검색 초기화</button>
            </span>
            <div>
                <div class="h5 text-center mt-3" style="font-weight: 500;">{{ this.stationName }}</div>
                <hr class="m-0">
                <div class="d-flex justify-content-between">
                    <div style="width: 100%;">
                        <div v-for="upInfo in stationInfoUp" v-show="stationInfoUp !== null" class="p-2">
                            <div>
                                <span style="font-weight: 600;">{{ upInfo.endSubwayStationNm }}</span>
                                <span style="float: right; color: red;">{{ this.formatDepTime(upInfo.depTime) }}분</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="vr" style="height: 100px;"></div>
                    </div>
                    <div style="width: 100%;">
                        <div v-for="downInfo in stationInfoDown" v-show="stationInfoDown !== null" class="p-2">
                            <div>
                                <span style="font-weight: 600;">{{ downInfo.endSubwayStationNm }}</span>
                                <span style="float: right; color: red;">{{ this.formatDepTime(downInfo.depTime) }}분</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 도착정보 검색 모달창 -->
    <div class="modal fade" id="subway" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" style="font-weight: 700;">지하철 도착정보 검색</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2 mx-1" style="font-weight: 500;">찾으시는 역의 이름을 입력해주세요</div>
                    <div class="input-group mb-3">
                        <input v-model="keyword" type="text" class="form-control focus-danger" placeholder="예) 부산, 서면">
                        <button @click="getStationName()" class="btn btn-outline-secondary" type="button"
                            id="button-addon2">검색</button>
                    </div>
                    <div v-if="this.isSearchLoading" class="m-4 d-flex justify-content-center">
                        <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else-if="this.hasError">
                        <div class="m-4 d-flex justify-content-center">
                            <h6 class="p-3 text-muted">요청시간이 만료되었습니다. 다시 검색해주세요</h6>
                        </div>
                    </div>
                    <ol v-else-if="isObject(this.stationList)" class="list-group" id="notArray">
                        <li @click="this.getStationInfo(this.stationList.subwayRouteName, this.stationList.subwayStationId, this.stationList.subwayStationName)"
                            class="list-group-item d-flex justify-content-between align-items-start list-group-item-action"
                            data-bs-dismiss="modal">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">{{ this.stationList.subwayStationName }}</div>
                                <div>{{ this.stationList.subwayRouteName }}</div>
                            </div>
                        </li>
                    </ol>
                    <ol v-else-if="isArray(this.stationList)" class="list-group" id="Array">
                        <li v-for="(station, idx) in stationList" :key="idx" @click="filterStation(idx)"
                            class="list-group-item d-flex justify-content-between align-items-start list-group-item-action"
                            data-bs-dismiss="modal">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">{{ station.subwayStationName }}</div>
                                <div>{{ station.subwayRouteName }}</div>
                            </div>
                        </li>
                    </ol>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            keyword: '',
            stationList: [],
            stationInfoUp: [],
            stationInfoDown: [],
            stationName: '',
            isChanged: false,
            storedInfo: [],
            selectedInfo: {},
            isSearchLoading: false,
            hasError: false,
        }
    },
    mounted() {
        if (JSON.parse(localStorage.getItem('stationInfoList')) !== null) {
            this.storedInfo = JSON.parse(localStorage.getItem('stationInfoList'))
        }
    },
    methods: {
        // 키워드로 역정보 검색
        getStationName() {
            this.isSearchLoading = true;
            this.hasError = false;
            const data =
            {
                keyword: this.keyword
            }
            axios.post('/api/station/keyword', data, { headers: { "Content-Type": `application/json` } })
                .then(response => {
                    const responseData = JSON.stringify(response.data.response.body.items.item);
                    this.stationList = JSON.parse(responseData);
                    this.isSearchLoading = false
                })
                .catch(error => {
                    this.hasError = true
                    this.isSearchLoading = false
                    console.log(error)
                })
        },
        // 역 명을 선택하면?
        // 1. 역정보 저장 - 로컬스토리지
        // 2. 역정보 기반으로 시간표 불러오기
        //      - 평일 01, 토요일 02, 일요일 03
        //      - 상행 1번, 하행 1번 총 2번 불러와야함
        getStationInfo(route, id, name) {
            if (localStorage.getItem('stationInfoList') !== null) {
                const data = JSON.parse(localStorage.getItem('stationInfoList'));
                // 스토리지에 이미 같은 역 정보가 있는 경우엔 저장하지 않음
                if (!this.hasSameData(id, data)) {
                    data.push({
                        subwayRouteName: route,
                        subwayStationId: id,
                        subwayStationName: name,
                    })
                }
                // 스토리지엔 최대 4개역 정보까지만 저장
                if (data.length > 4) {
                    data.splice(0, 1)
                }
                this.storedInfo = data
                localStorage.setItem('stationInfoList', JSON.stringify(data))
            } else {
                const data =
                    [{
                        subwayRouteName: route,
                        subwayStationId: id,
                        subwayStationName: name,
                    }]
                localStorage.setItem('stationInfoList', JSON.stringify(data));
            }
            // 호출 전 기존에 호출했던 데이터 초기화
            this.stationInfoUp = []
            this.stationInfoDown = []
            // 상,하행 각각 차례대로 2번 호출(그래도 TIMEOUT이 간간히 뜨는데 공공API 고질적인 문제인듯함)
            this.runSequentially(id);
        },
        // 노선 고유ID, 상하행 타입으로 API 호출
        async callStationInfo(id, upDownType) {
            const data =
            {
                stationId: id,
                upDownType: upDownType
            }
            axios.post('/api/station/info', data, { headers: { "Content-Type": `application/json` } })
                .then(response => {
                    // 현재시각 보다 작은 시간값은 필요없으므로 버리기
                    const responseData = response.data.response.body.items.item;
                    const filterByTime = responseData.filter(item => item.depTime > this.formatTime())
                    // 상 하행 여부에 따라 각 배열에 가장 가까운 첫번째, 두번째 배열 할당(각각 다음에 오는 열차, 다다음에 오는 열차)
                    if (upDownType === 'U') {
                        for (var i = 0; i <= 1; i++) {
                            this.stationInfoUp.push({
                                depTime: JSON.parse(JSON.stringify(filterByTime[i].depTime)),
                                endSubwayStationNm: JSON.parse(JSON.stringify(filterByTime[i].endSubwayStationNm)),
                            })
                        }
                    } else {
                        for (var i = 0; i <= 1; i++) {
                            this.stationInfoDown.push({
                                depTime: JSON.parse(JSON.stringify(filterByTime[i].depTime)),
                                endSubwayStationNm: JSON.parse(JSON.stringify(filterByTime[i].endSubwayStationNm)),
                            })
                        }
                    }
                    this.stationName = JSON.parse(JSON.stringify(filterByTime[i].subwayStationNm))
                })
                .catch(error => {
                    console.log(error)
                })
        },
        // 사용자가 리스트에서 클릭한 역 정보 가져와서 API 호출
        filterStation(idx) {
            const clickedStation = this.stationList[idx]
            const route = clickedStation.subwayRouteName
            const id = clickedStation.subwayStationId
            const name = clickedStation.subwayStationName
            this.getStationInfo(route, id, name)
        },
        // API요청용 날짜 포맷 메서드 평일, 토요일, 일요일 각각 01, 02, 03으로 포맷
        formatDayOfWeek() {
            const day = new Date().getDay();

            if (day >= 1 && day <= 5) {
                return '01';
            } else if (day === 6) {
                return '02';
            } else if (day === 0) {
                return '03';
            } else {
                return '01';
            }
        },
        // 응답받은 시간정보와 현재시간정보를 비교하기 위해 현재시간정보 HHMMSS 형식으로 포맷
        formatTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const formattedTime = hours + minutes + seconds;
            return formattedTime;
        },
        // 화면에 출력할 시간정보 HH:MM 형식으로 포맷
        formatDepTime(timeData) {
            const hours = String(timeData).substring(0, 2);
            const minutes = String(timeData).substring(2, 4);
            const formattedTime = `${hours}:${minutes}`;
            return formattedTime;
        },
        // API를 2번, 순서대로 호출
        async runSequentially(id) {
            try {
                await this.callStationInfo(id, "U");
                await this.callStationInfo(id, "D");
            } catch (error) {
                console.log(error)
            }
        },
        // 로컬스토리지에 저장된 정보(최근 검색기록)를 바탕으로 시간표 불러오기
        getStationInfoByStored(event) {
            this.isChanged = true
            this.selectedInfo = event.target.value;
            const data = this.selectedInfo;
            const route = JSON.parse(data).subwayRouteName
            const id = JSON.parse(data).subwayStationId
            const name = JSON.parse(data).subwayStationName
            this.getStationInfo(route, id, name)
        },
        // 검색을 통해 받아온 데이터와 로컬스토리지에 저장된 데이터 비교후 같은 데이터 존재여부에 따라 boolean반환
        hasSameData(id, storageData) {
            for (var i = 0; i < storageData.length; i++) {
                const storedId = JSON.parse(JSON.stringify(storageData[i])).subwayStationId;
                if (id === storedId) {
                    console.log("똑같은 역 존재함: " + id + " / " + storedId)
                    return true
                }
            }
            return false
        },
        clickInit() {
            localStorage.removeItem('stationInfoList')
            this.$router.go(0)
        },
        // 검색결과가 배열이 아니면서 오브젝트 타입인지? => 검색결과가 1개뿐인 경우
        isObject(value) {
            return typeof value === 'object' && !Array.isArray(value);
        },
        // 검색결과가 배열타입인지? => 검색결과가 여러개인 경우
        isArray(value) {
            return Array.isArray(value);
        }
    }
}
</script>

<style>
.subway_card {
    margin-bottom: 5%;
}

@media (max-width: 992px) {
    .subway_card {
        margin: 2% 0% 5% 0%;
    }
}
</style>