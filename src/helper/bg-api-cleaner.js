export const cleanSearch = (searches) => {
  return searches.elements[0].elements.map( search => {
    const id = search.attributes.id;
    const name = search.elements[0].attributes.value;
    return {id, name}
  })
}

export const cleanGameDetails = game => {
  return game.elements[0].elements.map( gameObj => {
    const gameDetails =  gameObj.elements.reduce( (cleanedGame, gameDetail) => {
      if (gameDetail.name === 'thumbnail' || gameDetail.name === 'image' || gameDetail.name === 'description') {
        cleanedGame[gameDetail.name] = gameDetail.elements[0].text
      }
      return cleanedGame
    }, {} )
    const id = gameObj.attributes.id;
    return {...gameDetails, id}
  })
}