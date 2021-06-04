import React, { useState } from 'react';
import { useRouter } from 'next/router';

import filesize from 'filesize';

import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from '../../styles/components/importacao/styles';

import { api } from "../../services/apiClient";

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Importacao: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const router = useRouter();
  const { addToast } = useToast()

  async function handleUpload(): Promise<void> {
    try {
      if (!Boolean(uploadedFiles.length)) {
        addToast({
          type: 'info',
          title: 'Atenção',
          description: "Adicione o arquivo para iniciar o processamento."
        });
        return
      }

      await Promise.all(
        uploadedFiles.map(file => {
          const data = new FormData();
          data.append('file', file.file, file.name);
          return api.post('/transactions/import', data);
        }),
      );

      addToast({
        type: 'success',
        title: 'Atenção',
        description: "Transações inclusas com sucesso."
      });

      router.push("/dashboard")
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const filesMapped: FileProps[] = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles([...uploadedFiles, ...filesMapped]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src="/alert.svg" alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Importacao;
