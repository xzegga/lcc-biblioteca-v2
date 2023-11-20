import { ScrollView, View, Text } from "react-native";
import tailwind from "twrnc";
import { Issue } from "./Issue";
import { CropIssues } from "../schemas/CropIssues";

export function Issues({
  issues,
  crop,
  title,
}: {
  issues: CropIssues[];
  crop: any;
  title: string;
}) {
  return (
    <View style={tailwind`h-[100%]`}>
      <View style={tailwind`relative`}>
        <View style={tailwind`flex flex-row justify-between pb-2 items-center`}>
          <Text style={tailwind`text-xl font-bold pb-4 text-green-900 `}>
            {title} del {crop.title}
          </Text>
        </View>
        <ScrollView style={tailwind`mb-30`}>
          {issues.map((issue: any) => (
            <View key={issue._id.toString()}>
              <View style={[tailwind`mt-0`]}>
                <Issue issue={issue} title={title} />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
