interface Data {
    [key: string]: any
}

interface MutateOptions<T> {
    optimisticData: (currentData: T[] | undefined) => T[]
    rollbackOnError: boolean
    populateCache: (result: T[], currentData: T[] | undefined) => T[]
    revalidate: boolean
}

export const addDataOptions = (newData: Data): MutateOptions<Data> => {
    return {
        optimisticData: (currentData: Data[] | undefined) =>
            [...(currentData || []), newData].sort((a, b) => b.id - a.id),
        rollbackOnError: true,
        populateCache: (result: Data[], currentData: Data[] | undefined) =>
            [...(currentData || []), ...result].sort((a, b) => b.id - a.id),
        revalidate: false,
    }
}

export const updateDataOptions = (updatedData: Data): MutateOptions<Data> => {
    return {
        optimisticData: (currentData: Data[] | undefined) => {
            const prevData = (currentData || []).filter(
                (item) => item.id !== updatedData.id,
            )
            return [...prevData, updatedData].sort((a, b) => b.id - a.id)
        },
        rollbackOnError: true,
        populateCache: (result: Data[], currentData: Data[] | undefined) => {
            const prevData = (currentData || []).filter(
                (item) => item.id !== updatedData.id,
            )
            return [...prevData, ...result].sort((a, b) => b.id - a.id)
        },
        revalidate: false,
    }
}

export const deleteDataOptions = ({
    id,
}: {
    id: number
}): MutateOptions<Data> => {
    return {
        optimisticData: (currentData: Data[] | undefined) =>
            (currentData || []).filter((item) => item.id !== id),
        rollbackOnError: true,
        populateCache: (result: Data[], currentData: Data[] | undefined) =>
            (currentData || []).filter((item) => item.id !== id),
        revalidate: false,
    }
}
