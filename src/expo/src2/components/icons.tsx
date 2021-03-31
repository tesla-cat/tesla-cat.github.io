
export { icons, icon }

function icon(name: string){
  return require(`../assets/images/${name}.png`)
}

const icons = {
  up: 'arrow-up-bold',
  down: 'arrow-down-bold',
  left: 'arrow-left',
  pen: 'fountain-pen-tip', 
  comment: 'comment-outline',
  hand: 'hand',
  dots: 'dots-vertical',
  retweet: 'twitter-retweet',
  share: 'share-variant',
  magnify: 'magnify',
  check: 'check-bold',
}