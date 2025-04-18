import useSWR, { mutate } from "swr";
import { useState } from "react";
import { fetcher, adder, updater, patcher, deleter } from "./crud";
import { AxiosRequestConfig } from "axios";
import { DEFAULT_PAGINATION } from "@/lib/paginated.constant";

interface Data {
  [key: string]: any;
}

export function useFetchData(pathname: string | null, options?: any) {
  const { data, isLoading, error, mutate } = useSWR(pathname, fetcher, options);

  const refetch = async () => {
    await mutate();
  };

  return {
    data,
    isLoading: isLoading,
    error,
    isSuccess: data && !error && !isLoading,
    refetch,
  };
}

export function useAddData(
  pathname: string | null,
  revalidatePath?: string,
  unpaginated?: boolean,
  hasExtraQuery?: boolean
) {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const create = async (newData: Data) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const addedData = await adder([pathname, newData]);
      setData(addedData?.data);
      if (hasExtraQuery) {
        await mutate(
          (key: string) => key.startsWith(revalidatePath as string),
          undefined,
          { revalidate: true }
        );
      } else {
        await mutate(
          `${revalidatePath || pathname}${
            unpaginated ? "" : DEFAULT_PAGINATION
          }`
        );
      }
      setIsSuccess(true);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { create, data, isLoading, error, isSuccess };
}

export function useUpdateData(
  pathname: string | null,
  revalidatePath?: string,
  unpaginated?: boolean,
  hasExtraQuery?: boolean
) {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const update = async (updatedData: Data) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const updated = await updater([pathname, updatedData]);
      setData(updated?.data);
      if (hasExtraQuery) {
        await mutate(
          (key: string) => key.startsWith(revalidatePath as string),
          undefined,
          { revalidate: true }
        );
      } else {
        await mutate(
          `${revalidatePath || pathname}${
            unpaginated ? "" : DEFAULT_PAGINATION
          }`
        );
      }
      setIsSuccess(true);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { update, data, isLoading, error, isSuccess };
}

export function usePatchData(
  pathname: string | null,
  revalidatePath?: string,
  unpaginated?: boolean,
  hasExtraQuery?: boolean
) {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
    setData(null);
  };

  const patch = async (updatedData: Data, config?: AxiosRequestConfig) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const updated = await patcher([pathname, updatedData, config]);
      setData(updated?.data);
      if (hasExtraQuery) {
        await mutate(
          (key: string) => key.startsWith(revalidatePath as string),
          undefined,
          { revalidate: true }
        );
      } else {
        await mutate(
          `${revalidatePath || pathname}${
            unpaginated ? "" : DEFAULT_PAGINATION
          }`
        );
      }
      setIsSuccess(true);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { patch, data, isLoading, error, isSuccess, reset };
}

export function useDeleteData(
  pathname: string | null,
  revalidatePath?: string,
  unpaginated?: boolean,
  hasExtraQuery?: boolean
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  };

  const remove = async () => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      await deleter([pathname]);
      if (hasExtraQuery) {
        await mutate(
          (key: string) => key.startsWith(revalidatePath as string),
          undefined,
          { revalidate: true }
        );
      } else {
        await mutate(
          `${revalidatePath || pathname}${
            unpaginated ? "" : DEFAULT_PAGINATION
          }`
        );
      }
      setIsSuccess(true);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading, error, isSuccess, reset };
}
