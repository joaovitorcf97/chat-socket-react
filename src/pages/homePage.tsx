import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import InputSubmit from '../components/input';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (inputValue: string) => {
    navigate(`/chat?name=${inputValue}`);
  };

  return (
    <>
      <Header />
      <main className="content-area flex flex-col items-center justify-center">
        <Container>
          <h1 className="flex h-full items-center justify-center p-10 px-32 text-4xl text-white-1">
            Seja bem-vindo, entre com um nickname:
          </h1>

          <InputSubmit
            onSubmit={handleSubmit}
            placeholder="Digite seu nome aqui..."
          />
        </Container>
      </main>
    </>
  );
};

export default HomePage;
