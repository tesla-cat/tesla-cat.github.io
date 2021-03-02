
function Imgs1(p: ImgsType){
  if(!p.imgs.length) return null
  const [show, setShow] = useState(false)
  const style = show?{
    height:'30vh', width:'100%',
  }:{
    height:p.height, width:'100%',
  }
  const imgs = <>
    <ScrollView horizontal={!show} style={{
      margin:3
    }} contentContainerStyle={style}>
      {p.imgs.map((img, idx)=>(
        <TouchableRipple key={idx} style={style} onPress={()=>{
          setShow(!show)
        }}>
          <Image source={{uri: img}} style={style} resizeMode='contain'/>
        </TouchableRipple>
      ))}
    </ScrollView>
    <Badge visible style={[css.abs1, css.gray]}>{p.imgs.length}</Badge>
  </>
  return(
    <View>
      {imgs}
      <Modal visible={show}>
        {imgs}
      </Modal>
    </View>
  )
}

function Imgs2(p: ImgsType){
  const urls = p.imgs.map(i=>({ url: i }))
  return(
    <View style={{height:p.height, marginTop: 3, zIndex:10}}>
      <ImageViewer 
        style={{zIndex: 10}}
        imageUrls={urls} backgroundColor={'transparent'} 
        renderIndicator={(n, N)=>(
          <Badge visible style={[css.abs1, css.gray]}>
            {`${n} / ${N}`}
          </Badge>
        )}
      />
    </View>
  )
}