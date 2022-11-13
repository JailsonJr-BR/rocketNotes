import { Container, Form } from "./styles";
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";


import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Noteitem } from "../../components/Noteitem";
import { Section } from "../../components/Section";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";


export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
    if (newLink === "") {
      return alert("Insira um link valido")
    }

    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link!== deleted));

  }

  function handleAddTag() {
    if (newTag === "") {
      return alert("Insira um marcador valido")
    }
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag!== deleted));
  }

  function handleBack() {
    navigate(-1)
  }

  async function handleNewNote(){

    if (!title)  {
      return alert("digite o titulo da nota");
    }

    if (newLink) {
      return alert("Você deixou um link no campo para adicinar, porém não clicou em adicionar.");
    }

    if (newTag) {
      return alert("Você deixou um marcador no campo para adicinar, porém não clicou em adicionar.");
    }

    if (links.length === 0) {
      return alert("Adicione um link valido");
    }

    if (tags.length === 0) {
      return alert("Adicione um marcador valido");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Nota criada com sucesso!");
    navigate(-1)
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText onClick={handleBack} title="voltar" />
          </header>

          <Input 
          placeholder="Titulo"
          onChange={e => setTitle(e.target.value)}
          />

          <Textarea 
          placeholder="Observações"
          onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <Noteitem
                  key={index} 
                  value={link} 
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
              
            <Noteitem 
              isNew 
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <Noteitem
                    key={String(index)} 
                    value={tag}
                    onClick={() => {handleRemoveTag(tag)}}
                  />
                ))
              }

              <Noteitem 
                isNew 
                placeholder="Nova tag"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title="Salvar"
            onClick={handleNewNote} 
          />
        </Form>
      </main>


    </Container>
  );
}