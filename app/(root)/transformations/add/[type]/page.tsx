import TransformationForm from "@/components/forms/TransformationForm";
import Header from "@/components/shared/Header";
import { transformationTypes } from "@/contstants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AddTransformationType = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  return (
    <>
      <Header
        title={transformation?.title}
        subtitle={transformation?.subTitle}
      />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation?.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationType;
