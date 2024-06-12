import AuthForm from '@/components/auth-form';

type HomeProps = {
  searchParams: { mode: string };
};

export default async function Home({ searchParams }: HomeProps) {
  console.log(searchParams);
  const formMode = searchParams.mode || 'login';
  return <AuthForm mode={formMode} />;
}
