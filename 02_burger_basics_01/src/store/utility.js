export const updateObject = (oldBject, updatedProperties) => {
    return {
        ...oldBject,
        ...updatedProperties
    }
}