
let initialState = {
    kiosks: [],
    actions: [],
    orders: [],
    history: [],
    isAuth: false
}

const toolkitReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_KIOSKS':
            return {
                ...state,
                kiosks: action.data,
            }
        case "SET_ACTIONS":
            return {
                ...state,
                actions: action.data
            }
        case "SET_ORDERS":
            return {
                ...state,
                orders: action.data
            }
        case "SET_HISTORY":
            return {
                ...state,
                history: action.data
            }
        case "RESET":
            return{
                ...state,
                actions: [],
                orders: [],
            }
        case "AUTH":
            return{
                ...state,
                isAuth:true
            }
        default:
            return state
    }
}
export const setKiosks = (data) => ({ type: "SET_KIOSKS", data })
export const setActions = (data) => ({ type: "SET_ACTIONS", data })
export const setOrders = (data) => ({ type: "SET_ORDERS", data })
export const setHistory = (data) => ({ type: "SET_HISTORY", data })
export const setAuth = () => ({ type: "AUTH"})
export const resetState = () => ({ type: "RESET" })
export default toolkitReducer