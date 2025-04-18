import { API } from './axiosInstance'
import { AxiosRequestConfig } from 'axios'

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args]

    const res = await API.get(url, { ...config })

    return res.data
}

export const adder = async (
    args: string | [string | null, any, AxiosRequestConfig?],
) => {
    const [url, data, config] = Array.isArray(args)
        ? args
        : [args, undefined, undefined]

    if (!url) throw new Error('URL is required')

    const res = await API.post(url, data, { ...config })
    return res.data
}

export const updater = async (
    args: string | [string | null, any, AxiosRequestConfig?],
) => {
    const [url, data, config] = Array.isArray(args)
        ? args
        : [args, undefined, undefined]

    if (!url) throw new Error('URL is required')

    const res = await API.put(url, data, { ...config })
    return res.data
}

export const patcher = async (
    args: string | [string | null, any, AxiosRequestConfig?],
) => {
    const [url, data, config] = Array.isArray(args)
        ? args
        : [args, undefined, undefined]

    if (!url) throw new Error('URL is required')

    const res = await API.patch(url, data, { ...config })
    return res.data
}

export const deleter = async (
    args: string | [string | null, AxiosRequestConfig?],
) => {
    const [url, config] = Array.isArray(args) ? args : [args]

    if (!url) throw new Error('URL is required')

    const res = await API.delete(url, { ...config })
    return res.data
}
