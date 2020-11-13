const cookieparser = require('cookieparser')
const Cookie = require('js-cookie')
export const state = () => ({
    authUser: null,
    personalInfo: null,
})

export const mutations = {
    SET_USER(state,user){
        state.authUser = user
    },

}

export const actions = {
    nuxtServerInit({commit},{req}){
        let auth = null
        if(req.headers.cookie){
            const parsed = cookieparser.parse(req.headers.cookie)
            try{
                auth = JSON.parse(parsed.auth)
            }catch(err){
                //no vaild cooie found
            }
        }
        commit('SET_USER',auth)
    },
    async login({commit}, {username, password}){
        try{
            const {data} = await this.$auth.loginWith('local', {username,password});
            if(data.status == 'false'){
                console.log("login faild")
            }else{
                commit('SET_USER',data);
                Cookie.set('auth',data);
                try{
                    let conf = {
                        headers: {
                            'Authorization' : `Token ${data.token}`
                        }
                    }
                    this.$router.push('Dashboard')
                }catch(err){
                    console.log("dashbord info error",err)
                }
            }
        }catch(err){
            console.log('Invaild user name')
        }
    },
    async logout({commit,state}){
        commit('SET_USER',null)
        this.$router.push("/")
    },
}


export const getters = {
    isAuthenticated(state){
        return state.auth.loggedIn
    },
    loggedInUser(state){
        return state.auth.user
    },
    
    
}