 import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import NavBar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'
import RateLimitedUI from '../components/RateLimitedUI'
 
 const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false)
  const  [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

 
  useEffect ( () => {
    const fetchNotes = async () => {
      try{
        const  res = await axios.get("http://localhost:5001/api/notes")
        console.log(res.data)
        setNotes(res.data)
        setRateLimited(false)
      }catch (error){
        console.log("Error fetching notes ")
        if (error.response.status == 429){
          setRateLimited(true)
        }
        else{
          toast.error("Failed to load notes")
        }
      }finally{
        setLoading(false)
      } 
    };
    fetchNotes();
  },[])

   return (
     <div className='min-h-screen'>
      <NavBar/>
      {isRateLimited && <RateLimitedUI/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        
    {notes.length>0 && !isRateLimited && (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} setNotes={setNotes} />
        ))}
      </div>
    )}

      </div>
      {notes.length == 0 && !isRateLimited && <NotesNotFound/>}
     </div>
   )
 }
 
 export default HomePage
 