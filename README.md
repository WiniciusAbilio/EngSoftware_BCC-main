# EngSoftware_BCC 🎓
Este repositório pertence ao projeto da disciplina de Engenharia de Software da UTFPR-CM. 🏫

O projeto é um site que permite que empresas no ramo alimentício identifiquem quais são as espécies de pragas encontradas nos silos junto com os grãos. 🌽🐜 O site utiliza uma inteligência artificial para identificar as espécies de pragas. 🧠💻

## Comandos Frontend 💻
Os comandos a seguir precisam ser executados dentro da pasta raiz no terminal:

**Instalar requerimentos frontend:**
```bash
npm install
```

**Executar o frontend:**
```bash
npm start
```

## Comandos Backend 🖥️
Os comandos a seguir precisam ser executados dentro da pasta backend pelo terminal:

**Instalar requerimentos backend:**
```bash
pip install -r requirements.txt 
```

**Executar o backend:**
```bash
python manage.py runserver
```

## Alterar senha padrão do MySQL 🔑
```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

## Insert admin do MySQL 🔑
```bash
INSERT INTO Usuario (`email`, `nomeUsuario`, `senha`, `tipoUsuario`)  VALUES ('a@a', 'AdminUsersenha123', 'pbkdf2_sha256$600000$OaYFURcOPhHQcbiYJoHPpy$d6K+1QrNdE47ENdQnH+otuC3rzbuJQZRH+nNS8ShgHU=', 'admin');
```
