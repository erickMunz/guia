---
title: 6. Manejo de imagenes
---
## Manejo de  Docker Images

Para poder utilzar los comandos es recomendado loguearse en la consola como usuario root :
```
javier@javier-orta:~$ sudo su root
[sudo] password for javier:
root@javier-orta:/home/javier#
```

### Docker Login
No es obligatorio pero por conveniencia es necesario ya haberse registrado y tener un Docker Id, y nos loguearemos en la consola :
```
root@javier-orta:/home/javier# docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username (javierorta): javierorta
Password:
Login Succeeded
root@javier-orta:/home/javier#
```

### Mostrar las imágenes de un host
Para mostrar todas la imágenes en el registro que se han descargado :
```
# docker images

Ejemplo :

root@javier-orta:/home/javier# docker images
REPOSITORY                         TAG                 IMAGE ID            CREATED             SIZE
test                               latest              667831a723a1        23 hours ago        2.07GB
local/c7-systemd                   latest              c5c5f96699ca        6 days ago          207MB
ubuntu                             latest              0458a4468cbc        3 weeks ago         112MB
centos                             7                   ff426288ea90        6 weeks ago         207MB
centos                             latest              ff426288ea90        6 weeks ago         207MB
store/datastax/dse-server          5.1.5               7671ebd725db        3 months ago        1.74GB
mariadb                            latest              abcee1d29aac        3 months ago        396MB
microsoft/mssql-server-linux       2017-latest         ebc4dc4e7b44        4 months ago        1.31GB
store/ibmcorp/db2_developer_c      11.1.2.2            83e8b59d8007        4 months ago        2.25GB
store/oracle/database-enterprise   12.2.0.1            12a359cd0528        6 months ago        3.44GB
sath89/oracle-xe-11g               latest              04851454491b        6 months ago        792MB
store/memsql/quickstart            5.0.3               c283440aacff        20 months ago       898MB
dockerkafka/kafka                  latest              9b40c23a50e2        21 months ago       340MB
dockerkafka/zookeeper              latest              026432301388        2 years ago         527MB
root@javier-orta:/home/javier#
```

### Eliminar una imágen
Eliminar una imágen, nota para poder eliminar una imagen es obligatorio que no exista un container utilizando la imágen, si no mostrara
un error en el cual dice que la imágen esta siendo utiizada por un container, si ese es el caso primero se debe de eliminar el container
utilizando el siguiente comando ```docker rm container_id``` :

```
Para eliminar una imágen se utiliza :
# docker rmi image_id

Ejemplo :

root@javier-orta:/home/javier# docker rmi 667831a723a1
Untagged: test:latest
Deleted: sha256:667831a723a170bfc05dcdc58c6bcaa4cf2ee2523699f00482c23fbdd7bf185a
Deleted: sha256:7f4fcaa29f05899df7a4d3caaee090e985abaa4f807a96f193e274b4a8535ba4
Deleted: sha256:45ed2a14de7200da15a27126e93973dd1e391d6613f33f47f4486b81b8489c6d
Deleted: sha256:2d705954521a759d6c81bf4dc0a11745a1ff7bf35de54e1f3455980573137c94
Deleted: sha256:1c68754bcab4783d68ec5f6bfbfb906e68903873c6647aa40e5e3739381a224d
Deleted: sha256:e7b6342cb252617d5e82d7c9c718a110ebc8973106baa116cae9bc5136f85eac
Deleted: sha256:ce5c5548f88f3d473f4effbba60bebab38a08a97448affbefea00eb182c234cd
Deleted: sha256:6c18706821adad844fa75e19995b22a64dda669546773441178286b3313912a0
Deleted: sha256:254eeb5435146c13a636b6e722716ee55fc8504edb425f13543abb437bcccbc8
Deleted: sha256:ed0ded8e9f49b2deeae9ff2f6db1bb98fcbeb4b43a542bcd37da48ee4584466f
Deleted: sha256:f1804954e8e30ad7e7927b3e86e2ac8e669b35a91c1fe669ed292dfa34548ba6
Deleted: sha256:d7597ec7caa326f101c57be7a7a606e3ec7d14f557a87c94436f6b3c4a5037fe
Deleted: sha256:6c3199977a6e6931f1dac17f001264aad6a9b02c37791ee275d54410c51f44e6
Deleted: sha256:55c8016b0e1a07df89e1d28b9f413ca8ac016aec568369ab2c933d0ee0c5dc13
Deleted: sha256:b2dcfd76dfbce5706cd6621da6bf93ad1cc8674383a886511363552e25fbb7fa
Deleted: sha256:2fd6c96b75f847f5c0cff2d626b9c0c71362590a94223ee3161477b4e8790cc3
Deleted: sha256:4cc2da5dd0615a8ebe1571c141480311d8f03413555aa756c19be6c597b6f2aa
Deleted: sha256:2857f450048b6859d7e1be69401e9cae66705116a5c43e3ae95ee671b3545c1c
Deleted: sha256:34201d8e817bc5612f0c7d46ab911de6a90e809ec0f6b9267200a55fe9945186
Deleted: sha256:f1cad9b7c7bc40e868bb5a2dba20babcd0266627fa02710e9198e28dc2267ba8
Deleted: sha256:aedf8be5f8ef1e74a1c5ce5e9e78f5a255ed890284275eb8916d4b87b273d775
Deleted: sha256:0494ef5b453f315a1b8a218043799479b17058257f7673671212d48fec85fdca
Deleted: sha256:d6a9b3d49f0a1bb3291086cc1514718588ab2ab49527cfaa382c32016db813aa
Deleted: sha256:3acda05d20f3716e0cc960954f03ae8c75f0270b5150a58b97db18098f330d3f
Deleted: sha256:871b046baf7185b3551efeabe563d153eb8967a460604d11ebb2b3d5dad2253d
Deleted: sha256:21288ea01faef133f7276bfb3b2aeed88c3ec065726594726fea6aa842db8bf5
Deleted: sha256:785e4b022e69f69152288e389756fc43b7bd1ba78fb05b1dbfd2a8402cd55c11
Deleted: sha256:f905bbea90030f01e5517d5df8c0ba3d46bb9ceccc30504ea269b7eecbd4489e
Deleted: sha256:ce10d53b995e1eb23220a6d992a2d155b37b8dd1bd7f49548e2c15651900275f
Deleted: sha256:e4a2589102dc1656ff0ce8c53aefa9590ba79a5791725e782c66de6df304124b
Deleted: sha256:0b5e97c54833fecab4dd6d2aeaf4ca813a2d8ad043e041557897bd823d6e7796
Deleted: sha256:7586ca872b9199a05b300eaaff1e27c4303604c39e779d6fbc57d8428edf3186
Deleted: sha256:87d02ced3faa84d06529ee72296ea7a7bf2ec25d086ef27046922e1f3ac0605e
Deleted: sha256:f7573420d292657ee34b70caabfba77507aef2a1b8c5de8b049b92662284ca5c
Deleted: sha256:c6b8f0b6eea36b556a3e4593886c65a40d093b778fe1053bca243f408b8b9643
Deleted: sha256:a10a5882a35b8c6db7983fa4924c212d731155d3da8597a0bde71372f9b802ff
Deleted: sha256:c3a1ec89faf82e90bc781afb44b713a37060c22642a4bb982328bc652b4d2258
Deleted: sha256:8d3925a7df3a7733f1413da69617d357b324e7596bf3fe2a90a5878d161ae88b
Deleted: sha256:fa9344452d754bc82b7bc2ddc94053701f01236be1317a33c7c4e5389f6fbf8b
Deleted: sha256:8163000b1aa4c5b04ca0af0c5ad29117a7225fd9e51ac67cd0e15f715f13fb37
Deleted: sha256:22d927a091d26651e580e2872d9e319a55afa436de27561c10f902ea2514ac98
Deleted: sha256:b37722c1eec42489119a15cbad9801f7036029e1b74ae288f5f912e4c07a8733
Deleted: sha256:c1cff4e0b32bdfb50b05bde925a708d5982e1bf62faca5ea5cfe233f8160bc87
Deleted: sha256:6e29d6caf47fe1173bb173a21f7588962caca3521293597275b803e64eec0b7e
Deleted: sha256:2ebd60c19bac54e7feb6c997dc682377e6f64f5c52ee9b12df7195f2998dc39f
Deleted: sha256:bdd495dd9679944861fec113cd4eccc6e7575c9abb7e47422026d0d9f0da6a0d
Deleted: sha256:ea25c7920bd1e6af3be40eacacb3593118ec64c1850cead3663b7f5c026f181a
Deleted: sha256:f5b89ba4a33e4dc99ec7caaf8e5bb2e510993540524b74ce3d42b8b2f13f513b
root@javier-orta:/home/javier#

```
### Buscar imágenes
Se puede buscar imágenes desde la consola, se utiliza el siguiente comando :
```
# docker search image_name
```

Ejemplo, buscar una imágen de mysql :
```
root@javier-orta:/home/javier# docker search mysql
NAME                                                   DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
mysql                                                  MySQL is a widely used, open-source relation…   5743                [OK]                
mariadb                                                MariaDB is a community-developed fork of MyS…   1790                [OK]                
mysql/mysql-server  
```

### Descargar una imágen(pull)

Para utilizar una imágen es necesario descargala(pull a una imágen), nos dirigimos ya sea a la docker store ó docker hub, buscamos alguna imágen que nos interese y le hacemos un pull, abrimos la consola igual como sudo, y ejecutamos el pull :
```
root@javier-orta:/home/javier/DockerFiles/test# sudo docker pull microsoft/mssql-server-linux:2017-latest
2017-latest: Pulling from microsoft/mssql-server-linux
f6fa9a861b90: Pull complete
da7318603015: Pull complete
6a8bd10c9278: Pull complete
d5a40291440f: Pull complete
bbdd8a83c0f1: Pull complete
3a52205d40a6: Pull complete
6192691706e8: Pull complete
1a658a9035fb: Pull complete
75ed4e3c20d0: Pull complete
8f7fb191cdc4: Pull complete
Digest: sha256:75077937b3c29c193bc31c0d7e5e0df5461a57db4e279f30719a18556079fe11
Status: Downloaded newer image for microsoft/mssql-server-linux:2017-latest
root@javier-orta:/home/javier/DockerFiles/test#
```

Mostramos la nueva imágen :
```
root@javier-orta:/home/javier/DockerFiles/test# docker images | grep microsoft/mssql-server-linux
microsoft/mssql-server-linux   2017-latest         ab22b8353bbd        5 days ago          1.42GB
root@javier-orta:/home/javier/DockerFiles/test#
```
