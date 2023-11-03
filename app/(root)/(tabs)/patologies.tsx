import CropIssues from "../../../components/CropIssues";
import useCropIssuesQuery from "../../../hooks/useCropIssuesQuery";
import { CropIssues as CropIssuesSchema } from "../../../schemas/CropIssues";

export default function Patologies() {
  const { issueTitle, issuesByCrop, crop } = useCropIssuesQuery();

  return (
    <CropIssues
      issueTitle={issueTitle as string}
      issuesByCrop={issuesByCrop as CropIssuesSchema[]}
      crop={crop}
    />
  );
}
