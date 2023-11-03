import { useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useCropIssues } from "./useCropIssues";
import { useCrops } from "./useCrops";
import { CropIssues } from "../schemas/CropIssues";

export default function useCropIssuesQuery(){
    const crops = useCrops();
    const { cropId, issueTitle, deseases } = useGlobalSearchParams();
    const [crop, setCrop] = useState<any>();

    const issues = useCropIssues();
    const issuesByCrop = crop && crop.id ? issues.findByCrop(crop.id, deseases as string) : [];

    useEffect(() => {
        const cropItem = cropId ? crops.getById(cropId.toString()) : null;
        if (cropItem) {
            setCrop(cropItem);
        }
    }, []);

    return {
        issueTitle: issueTitle as string,
        issuesByCrop,
        crop
    }
}