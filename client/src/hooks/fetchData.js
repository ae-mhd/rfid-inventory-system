// import { useToast } from '@/components/ui/use-toast';
// import { useAuthContext } from '@/context/authContext';
import { useToast } from '@/components/ui/use-toast';
import { useAuthContext } from '@/context/authContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';


const handleErrorMessage = (error, errorMsg) => {
    let errorMessage
    if (errorMsg) {
        errorMessage = errorMsg
    } else if (error.response?.data?.message) {
        if (error.response?.data?.message === 'Unable to find related data') {
            errorMessage = 'لايوجد بيانات'

        } else {
            errorMessage = error.response?.data?.message
        }

    } else {
        errorMessage = 'خطأ غير معروف'

    }
    return errorMessage
}

export const usePost = (api, queryKey = [], successMessage, errorMsg) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const postData = async (data) => {
        const res = await axios.post(api, data,);
        const apiData = await res.data;
        return apiData;
    };

    const mutation = useMutation({
        mutationKey: queryKey,
        mutationFn: postData,
        onSuccess: () => {
            if (successMessage) {
                toast({
                    variant: 'default',
                    description: successMessage,
                });
            }
            queryClient.invalidateQueries({ queryKey });
        },
        onError: (error) => {
            // console.log('error===>', error)
            toast({
                variant: 'destructive',
                description: handleErrorMessage(error, errorMsg),
            });

        },
    });

    return mutation;
};
export const useUpdate = (api, queryKey = [], successMessage, errorMsg) => {

    const { toast } = useToast()
    const queryClient = useQueryClient()
    const postData = async (data) => {

        const res = await axios.put(api, data)
        return res

    }
    const mutation = useMutation({
        mutationKey: queryKey,
        mutationFn: postData,
        onSuccess: () => {
            successMessage &&
                toast({
                    variant: 'default',
                    // title: "Success",
                    description: successMessage,
                })

            queryClient.invalidateQueries({ queryKey: queryKey })
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                description: handleErrorMessage(error, errorMsg),
            });

        },
    })
    return mutation
}


export const useDelete = (api, queryKey = [], successMessage, errorMsg) => {
    // const { user } = useAuthContext()
    // const token = user?.apikey?.token
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const deleteData = async (data) => {
        // const res = await axios.delete(api, { data, headers: { 'x-api-key': token } })
        const res = await axios.delete(api, { data, })
        return res?.data
    }
    const query = useMutation({
        queryKey,
        mutationFn: deleteData,
        onSuccess: () => {
            successMessage &&
                toast({
                    variant: 'default',
                    description: successMessage,
                })
            queryClient.invalidateQueries({ queryKey })
        },
        onError: (error) => {

            toast({
                variant: 'destructive',
                description: handleErrorMessage(error, errorMsg),
            });

        },
    })
    return query
}

export const getFetch = async (token, api) => {
    const response = await axios.get(api, { headers: { 'x-api-key': token } });
    return response.data;
}
export const useFetch = (api, params, enabled = true, errorMsg) => {
    const { user } = useAuthContext();
    const token = user?.apikey?.token;
    const { toast } = useToast()

    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    const fetchData = useCallback(async () => {
        // setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await axios.get(api, {
                params,
                headers: { 'x-api-key': token }
            });
            setState({ data: response.data, loading: false, error: null });
        } catch (error) {
            console.error('Error fetching data:', error);
            setState({ data: null, loading: false, error });

            toast({
                variant: 'destructive',
                description: handleErrorMessage(error, errorMsg),
            });

        }
    }, [api, params, token]);

    useEffect(() => {
        enabled && fetchData();
    }, [fetchData, enabled]);

    return state;
};

export const useGet = (api, queryKey = [], params = {}, useQueryOptions) => {
    console.log('params', params)


    const getData = async () => {
        const res = await axios.get(api, { params });
        return res;
    }

    const { enabled = true } = useQueryOptions || {};
    const query = useQuery({
        queryKey,
        queryFn: getData,
        onError: (error) => error,
        enabled,
    });

    return query;
};