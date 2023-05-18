<template>
    <div class="card rounded-0 border-0 border-top">
        <div class="card-body">
            <span class="h5 card-title mb-3" style="font-weight: 700;">
                <span>🚌 부산 버스 도착정보</span>
                <a href="#" class="btn btn-secondary btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#bus">검색</a>
            </span>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="bus" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" style="font-weight: 700;">버스 도착정보 검색</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2 mx-1" style="font-weight: 500;">찾으시는 버스의 번호를 검색해주세요</div>
                    <div class="input-group mb-3">
                        <input v-model="inputBusNum" type="text" class="form-control focus-danger" placeholder="예) 33, 111">
                        <button @click="getBusNumList(this.inputBusNum)" class="btn btn-outline-secondary" type="button"
                            id="button-addon2">검색</button>
                    </div>
                    <!-- 로딩창-->
                    <div v-if="this.isLoading" class="m-4 d-flex justify-content-center">
                        <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-if="this.hasError" class="m-4 d-flex justify-content-center">
                        <h5 class="p-3 text-muted">요청시간이 만료되었습니다 다시 검색해주세요</h5>
                    </div>
                    <!-- 로딩창-->
                    <!-- 검색결과 1개인 경우-->
                    <ol v-if="!this.isLocationLoaded && isObject(this.busNumList)" class="list-group">
                        <li @click="getBusLocation()"
                            class="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
                            <div class="ms-2 me-auto">
                                <div class="h4 fw-bold">{{ this.busNumList.buslinenum }}</div>
                                <div class="h6">{{ this.busNumList.bustype }}</div>
                                <div><small>{{ this.busNumList.startpoint }} - {{ this.busNumList.endpoint }}</small></div>
                                <div><small>배차간격 {{ this.busNumList.headwaypeak }}분</small></div>
                            </div>
                        </li>
                    </ol>
                    <!-- 검색결과 1개인 경우-->
                    <!-- 검색결과 여러개인 경우-->
                    <ol v-if="!this.isLocationLoaded && isArray(busNumList)" class="list-group">
                        <li @click="getBusLocation(idx)" v-for="(bus, idx) in busNumList"
                            class="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
                            <div class="ms-2 me-auto">
                                <div class="h4 fw-bold">{{ bus.buslinenum }}</div>
                                <div class="h6">{{ bus.bustype }}</div>
                                <div><small>{{ bus.startpoint }} - {{ bus.endpoint }}</small></div>
                                <div><small>배차간격 {{ bus.headwaypeak }}분</small></div>
                            </div>
                        </li>
                    </ol>
                    <!-- 검색결과 1개인 경우-->
                    <!-- 실시간 위치정보-->
                    <div v-if="this.isLocationLoaded" class="list-group">
                        <div v-for="location in busLocationList" class="row">
                            <div class="col-2 text-center py-1" style="min-height: 75px;">
                                <span v-if="location.carno">
                                    <img :src="bus" width="25" />
                                    <div style="font-size: 0.75rem;">{{ location.carno }}</div>
                                    <div style="font-size: 0.75rem;">({{ this.isLowPlate(location.lowplate) }})</div>
                                </span>
                            </div>
                            <div class="col-10 ps-0">
                                <a
                                    class="list-group-item list-group-item-action border-0 border-5 border-start border-secondary">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">{{ location.bstopnm }}</h6>
                                    </div>
                                    <p class="mb-1">{{ location.arsno }}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- 실시간 위치정보-->
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
import bus from '@/assets/icon/common/bus-front-fill.svg'

// 1. 버스번호로 버스정보 검색
// 2. 검색시 받아온 노선 id 저장
// 3. 노선id로 해당 버스 전체 운행상태 출력
export default {
    data() {
        return {
            inputBusNum: '',
            busNumList: [],
            selectedBus: [],
            busLocationList: [],
            bus: bus,
            isLocationLoaded: false,
            isLoading: false,
            hasError: false,
        }
    },
    methods: {
        getBusNumList(num) {
            // 필요한 값 초기화
            this.hasError = false;
            this.isLoading = true;
            this.isLocationLoaded = false;
            this.busNumList = [];
            // 버스번호 리스트 받아오기 
            const data =
            {
                busNum: num
            }
            axios.post(`/api/bus/num`, data, { headers: { "Content-Type": `application/json` } })
                .then(response => {
                    const xml = response.data // 전체 XML 데이터
                    const xml2js = require('xml2js');
                    const parser = new xml2js.Parser({ explicitArray: false });
                    parser.parseString(xml, (err, result) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        const data = result;
                        this.busNumList = JSON.parse(JSON.stringify(data.response.body.items.item));
                        // console.log("버스 번호 리스트" + JSON.stringify(this.busNumList))
                        this.isLoading = false
                    });
                })
                .catch(error => {
                    this.isLoading = false
                    this.hasError = true;
                })
        },
        getBusLocation(idx) {
            this.hasError = false;
            this.isLoading = true;
            let lineId = ''
            if (idx === undefined || idx === null) {
                lineId = this.busNumList.lineid
            } else {
                this.selectedBus = this.busNumList[idx]
                lineId = this.selectedBus.lineid;
            }
            // console.log("선택된 버스의 lineId: " + lineId)
            const data =
            {
                lineId: lineId
            }
            axios.post(`/api/bus/location`, data, { headers: { "Content-Type": `application/json` } })
                .then(response => {
                    const xml = response.data // 전체 XML 데이터
                    const xml2js = require('xml2js');
                    const parser = new xml2js.Parser({ explicitArray: false });
                    parser.parseString(xml, (err, result) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        const data = result;
                        this.busLocationList = JSON.parse(JSON.stringify(data.response.body.items.item));
                        this.isLocationLoaded = true;
                        this.isLoading = false;
                    });
                })
                .catch(error => {
                    this.hasError = true;
                })
        },
        isLowPlate(value) {
            return value == 1 ? '저상' : '일반';
        },
        // 검색결과가 배열이 아니면서 오브젝트 타입인지? => 검색결과가 1개뿐인 경우
        isObject(value) {
            return typeof value === 'object' && !Array.isArray(value);
        },
        // 검색결과가 배열타입인지? => 검색결과가 여러개인 경우
        isArray(value) {
            return Array.isArray(value);
        }
        // 로딩
        // 1. 검색로딩
        // 2. 노선불러오기 로딩
    }

}
</script>

<style>
.arrow {
    position: absolute;
    background-color: #fff;
    top: 45%;
    left: 6.66%;
    width: 5%;
}</style>