import { queryLawStatus, queryPatentType, queryMaintainState } from '@/api/patentStore'
import { queryGencyType, selectAddressData } from '@/api/serviceOrgan'
import { queryNewType } from '@/api/infoList'
export const mixin = {
    data() {
        return {
            laywerList: [],//法律类型
            patentTypeList: [], //专利类型
            patentStatusList: [],//维持状态
            statusList: [
                {
                    key: '启用',
                    value: 1
                },
                {
                    key: '禁用',
                    value: 0
                }
            ],//状态
            roleList: [
                {
                    key: '教师',
                    value: 1
                },
                {
                    key: '企业',
                    value: 2
                },
                {
                    key: '游客',
                    value: 3
                }
            ],// 用户类型
            gencyTypeList: [], //机构类型
            adressList: [],//地址
            newsList: [],//文章类型
            certRoleList: [
                {
                    key: '教师',
                    value: 1
                },
                {
                    key: '企业',
                    value: 2
                },

            ],// 认证类型
        }
    },
    created() {
        this.queryLawStatusList()
        this.queryPatentTypeList()
        this.queryMaintainStateList()
        this.queryGencyTypeList()
        this.queryNewTypeList()
        this.selectAddressList()
    },
    methods: {
        async queryLawStatusList() {
            const dictResult = await queryLawStatus()
            this.laywerList = dictResult.sysDicts
        },
        async queryPatentTypeList() {
            const dictResult = await queryPatentType()
            this.patentTypeList = dictResult.sysDicts
        },
        async queryMaintainStateList() {
            const dictResult = await queryMaintainState()
            this.patentStatusList = dictResult.sysDicts
        },
        async queryGencyTypeList() {
            const dictResult = await queryGencyType()
            this.gencyTypeList = dictResult.sysDicts
        },
        async queryNewTypeList() {
            const dictResult = await queryNewType()
            this.newsList = dictResult.sysDicts
        },
        async selectAddressList() {
            const dictResult = await selectAddressData()
            if (dictResult.code == 0) {
                const data = dictResult.statesList
                data.forEach(item => {
                    item.children = item.citiesList
                    item.citiesList.forEach(it => {
                        it.children = it.regionsList
                    })

                });
                this.adressList = data
            }
        },
    }
}

