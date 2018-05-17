---
title: 1-Funciones Básicas Vi/Vim
---
## Funciones Básicas Vi/Vim

Vim es un editor de texto, el cual permite que el usuario, se olvide de utilizar el mouse y las teclas de dirección para poder editar los archivos en terminal.

 Se encuentra disponible para diferentes sistemas operativos: AmigaOS, Atari MiNT, BeOS, DOS, MacOS, NextStep, OS/2, OSF, RiscOS, SGI, UNIX, VMS, Win16 + Win32(Windows95/98/00/NT) - y especialmente FreeBSD y Linux.


---
  Instalacion de Vim en Ubuntu 
---
En algunos de los sistemas operativos, Vim ya viene instalado, pero para tener la certeza utilizamos el siguiente comando en una terminal: 

```
$ sudo apt-get install vim
```
Editamos el archivo de configuración de Vim:
```
$ vi ~/.vimrc
```

Se agregan los siguientes valores al archivo de configuración y se guarda el archivo. (En la siguiente sección podrás observar los comandos básicos de Vim).

```
syntax on
set expandtab
set tabstop=4
retab
set shiftwidth=4
set hlsearch
set paste
set ic
set number
color wombat
```

---
  Comandos básicos de Vim
---

En vim se utilizan comandos los cuales nos permiten guardar,salir, salir sin guardar, etc. Para ello es necesario activar el modo de comandos, esto se realiza pulsando la tecla <ESC>. 

Al haber entrado en modo de comandos podemos realizar las siguientes operaciones: 

Guardar un archivo: 
```
:w
```
Nombrar un archivo nuevo o modificar el nombre del archivo:
```
:w nuevo_nombre_del_archivo.txt
```

Salir del editor de texto: 
```
:q
```

Salir sin guardar: 
```
:q!
```

Guardar y salir: 
```
:wq
```

eliminar el siguiente carácter debajo del cursor:
```
x
```

eliminar el carácter anterior debajo del cursor:
```
X
```

Eliminar toda la linea actual: 
```
dd 
```
Eliminar todos los caracteres hasta el final de la palabra actual: 
```
dw
```

Deshacer: 
```
u
```

Deshacer lo ultimo que hemos hecho en la linea actual: 
```
U
```

Para poder editar un texto, es necesario ingresar al modo de inserción, esto se realiza pulando la tecla <i>.


Para saber más de Vim: <a href='http://www.vim.org/6k/features.es.txt' target='_blank' rel='nofollow'>http://www.vim.org/6k/features.es.txt</a>


Para mayor información acerca de los comandos que se utilizan en Vim: <a href='https://www.garron.me/es/articulos/guia-de-vi-vim.html' target='_blank' rel='nofollow'>https://www.garron.me/es/articulos/guia-de-vi-vim.html</a>

	
