const camelCaseRegex = /[_ -]+([a-zA-Z0-9])/g

/** @param {string} str */
export function camelCase(str) {
    return str.replace(camelCaseRegex, function (_, c) {
        return c.toUpperCase()
    })
}

/** @param {string} str */
export function capitalize(str) {
    if (!str) return
    return str[0].toUpperCase() + str.slice(1)
}
