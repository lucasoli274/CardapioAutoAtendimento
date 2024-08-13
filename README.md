# Cardápio para autoatendimento
Este projeto utiliza React Native, Java e MySQL para criar uma espécie de cardápio, como aqueles usados em redes de fast food para autoatendimento. O aplicativo divide os objetos presentes no banco de dados pela coluna "tipo" para apresentá-los ao usuário em diferentes categorias (ex: entrada, sobremesa, bebida), 

O aplicativo foi desenvolvido de forma a exibir curiosidades e não alimentos, mas pode ser facilmente modificado para atender a esse e outros tipos de objeto. 

Para alterar o objeto a ser distribuído pelo aplicativo de Curiosidade para qualquer outro, basta alterar todos os 4 arquivos no back-end que tem o nome iniciado em Curiosidade.
Para alterar a forma como o objeto é filtrado para exibição em categorias no front-end, basta alterar os métodos na classe CuriosidadeResource que atualmente filtram a coluna tipo por "templo", "prato" e "evento".
