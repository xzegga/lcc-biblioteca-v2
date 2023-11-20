import { useEffect, useRef } from "react";
import NetInfo from '@react-native-community/netinfo';
import { useQueries } from "./useQueries";
import { useStore } from "./useGlobalStore";
import { useAuth } from "../context/AuthContext";


export default function useUpdateQuery() {
    const { networkStatus, setState } = useStore(state => ({
        networkStatus: state.networkStatus,
        setState: state.setState
    }));
    const { authState } = useAuth();
    const queries = useQueries();
    const items = authState?.user ? queries.localItems(authState?.user) : [];

    const updated = useRef<boolean>(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setState({ networkStatus: (state.isConnected! && state.isInternetReachable!) });
        });

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (networkStatus) {
            updated.current = false;
            updateQueries();
        }
    }, [networkStatus])

    const updateQueries = async () => {
        if (items?.length > 0) {
            for (const query of items) {
                await queries.postQuery(query);
            }
        }
    }

    return {
        networkStatus
    }
}

