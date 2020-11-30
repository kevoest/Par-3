import {db} from './firebase'
import {useState, useEffect} from 'react'
import "../src/style.css"


function App() {

  const [libros, setLibros] = useState([])
  const [titulo, setTitulo] = useState([])
  const [autor, setAutor] = useState([])
  const [clasificacion, setClasificacion] = useState([])
  const [editorial, setEditorial] = useState([])
  const [idLibro, setIdLibro] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [modoEliminar, setModoEliminar] = useState(false)
  const [id, setId] = useState('')

  const getLibros = async () =>{
    const data = await db.collection('libros').get()
    const arrayLibros = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setLibros(arrayLibros)
    console.log(libros)
  }

    useEffect(()=>{
      getLibros()
   },[]) // eslint-disable-line react-hooks/exhaustive-deps

   const limpiarIns =() =>{
    setAutor("")
    setClasificacion("")
    setEditorial("")
    setIdLibro("")
    setTitulo("")
    setId("")
   }

   const agregarLibro = async(e)=>{
      e.preventDefault()
      const firebaseLibros = await db.collection('libros').add({
        Autor: autor,
        Clasificacion: clasificacion,
        Editorial: editorial,
        IdLibro: idLibro,
        Titulo: titulo
      })
      limpiarIns()
      getLibros()
   }

    const activarEdicion = (item) =>{
      setModoEdicion(true)
      if(!modoEdicion){
        setAutor(item.Autor)
        setClasificacion(item.Clasificacion)
        setEditorial(item.Editorial)
        setIdLibro(item.IdLibro)
        setTitulo(item.Titulo)
        setId(item.id)
      }else{
        setModoEdicion(false)
        limpiarIns()
      }
      
    }

    const activarEliminar = (item) =>{
      setModoEliminar(!modoEliminar)
    }

    const editarLibro = async(e) =>{
      e.preventDefault()
      const firebaseLibros = await db.collection('libros').doc(id).update({
        Autor: autor,
        Clasificacion: clasificacion,
        Editorial: editorial,
        IdLibro: idLibro,
        Titulo: titulo
      })
      setModoEdicion(false)
      limpiarIns()
      getLibros() 
    }

    const eliminarLibro = async(id) =>{
      await db.collection('libros').doc(id).delete()
      activarEliminar()
      getLibros()
    }

  return (
    <div className = "DivFrom">
      {modoEdicion ? <h2>Editar</h2> : <h2 className = "Add" >Agregar</h2>}
      <form className = "From" onSubmit = {modoEdicion ? editarLibro : agregarLibro}>
          <div>
            <label>Autor</label>
            <input type="text" value={autor} onChange={e => setAutor(e.target.value)} required></input>
            <label>Libro ID</label>
            <input type="text" value={idLibro} onChange={e => setIdLibro(e.target.value)} required></input>
            <label>Clasificacion</label>
            <input type="text" value={clasificacion} onChange={e => setClasificacion(e.target.value)} required></input>
            <label>Editorial</label>
            <input type="text" value={editorial} onChange={e => setEditorial(e.target.value)} required></input>
            <label>Titulo</label>
            <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required></input>
            <button  className = "btnAceptar" type="submit"><spam>Aceptar<spam/></spam></button>
          </div>
          
      </form>
      <p className = "List" >Listado</p>
      <ul className = "list-group ">
        {
        libros.map(item => (
          
          <li key = {item.id}>
            <ul> Autor: {item.Autor}</ul>
            <ul> ID: {item.IdLibro}</ul>
            <ul> Clasificacion: {item.Clasificacion}</ul>
            <ul> Editorial: {item.Editorial}</ul>
            <ul> Titulo: {item.Titulo}</ul>
            {modoEdicion ? <button className = "cnsEdit" onClick={() => activarEdicion(item)}>Cancelar edicion</button> : 
            <button className = "edit" onClick={() => activarEdicion(item)}>Editar</button>}
            {modoEliminar ?
            <h>
              Seguro?
              <button className = "btnActEli1" onClick={() => eliminarLibro(item.id)}>Si</button>
              <button className = "btnActEli2" onClick={() => activarEliminar(item)}>No</button>
            </h> 
            : <button className = "btnEli" onClick={() => activarEliminar(item)}>Eliminar</button>}
            
        </li>
        ))
        }
      </ul>
    </div>
  );
}

export default App;
