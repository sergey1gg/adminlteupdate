
let initialState = {
    menu: [],
    group: [],
    product: [],
    dependens: []
}

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MENU':
            return {
                ...state,
                menu: action.data,
            }
        case "SET_GROUP":
            return {
                ...state,
                group: action.data
            }
        case "SET_PRODUCT":
            return {
                ...state,
                product: action.data
            }
        case "SET_DEPENDENS":
            return {
                ...state,
                dependens: action.data
            }
        default:
            return state
    }
}
export const setMenu = (data) => ({ type: "SET_MENU", data })
export const setGroup = (data) => ({ type: "SET_GROUP", data })
export const setProduct = (data) => ({ type: "SET_PRODUCT", data })
export const setDependens = (data) => ({ type: "SET_DEPENDENS", data })
export default menuReducer