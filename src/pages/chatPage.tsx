import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Container from '../components/Container';
import Header from '../components/Header';
import Message from '../components/Message';
import InputSubmit from '../components/input';
import useSocket from '../hooks/useSocket';

interface IMessage {
  id: string;
  name: string;
  text: string;
  profileImage: string;
  isOwner?: boolean;
}

const ChatPage = () => {
  const { socketInstance, isConnected } = useSocket();
  const [searchParams] = useSearchParams();
  const username = searchParams.get('name') as string;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageContainer.current?.scrollTo(
      0,
      messageContainer.current.scrollHeight
    );
  }, [messages]);

  useEffect(() => {
    socketInstance.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketInstance.off('message');
    };
  }, [socketInstance]);

  const handleSubmit = (data: string) => {
    const newMessage = {
      text: data,
      name: username,
      profileImage: 'https://avatars.githubusercontent.com/u/24613695?v=4',
      id: uuid(),
    };

    socketInstance.emit('message', newMessage);
    setMessages((prev) => [
      ...prev,
      {
        ...newMessage,
        profileImage: 'https://avatars.githubusercontent.com/u/24613695?v=4',
        isOwner: true,
      },
    ]);
  };

  return (
    <>
      <Header />
      <main className="content-area flex flex-col items-center justify-center">
        <Container>
          <div
            ref={messageContainer}
            className="flex h-[60rem] flex-col overflow-auto px-5 pt-14"
          >
            {messages.map((message) => (
              <Message
                key={message.id}
                name={message.name}
                image={message.profileImage}
                message={message.text}
                isOwner={message.isOwner}
              />
            ))}
          </div>
          <InputSubmit
            onSubmit={handleSubmit}
            placeholder="Digite sua mensagem aqui"
          />
        </Container>
      </main>
    </>
  );
};

export default ChatPage;
