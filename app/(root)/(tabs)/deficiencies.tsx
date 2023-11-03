import CropIssues from '../../../components/CropIssues';
import useCropIssuesQuery from '../../../hooks/useCropIssuesQuery';

export default function Deficiencies() {
    const { issueTitle, issuesByCrop, crop} = useCropIssuesQuery()

    return <CropIssues
        issueTitle={issueTitle as string}
        issuesByCrop={issuesByCrop}
        crop={crop} />
}