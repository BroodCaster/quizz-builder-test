import CreateForm from '~/components/quizzes/create-form';
import PageLayout from '~/layouts/page-layout';

export default function index() {
  return (
    <PageLayout>
      <div className="flex flex-col">
        <h1 className="text-center text-4xl">Create a Quizz</h1>
        <CreateForm />
      </div>
    </PageLayout>
  );
}
