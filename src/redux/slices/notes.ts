import axios from "../../axios";
import { createSlice, PayloadAction ,createAsyncThunk} from '@reduxjs/toolkit';
export const fetchNotes = createAsyncThunk('notes/getchNotes',async()=>{
 const {data} = await axios.get('/notes')
 return data
})
export const fetchNotesUpdate = createAsyncThunk('notes/updateNotes',async ({ id, dataToUpdate }: { id: string; dataToUpdate: any })=>{
  const {data} = await axios.patch(`notes/${id}`,dataToUpdate)
  return data
})
export const fetchTagsByNotes = createAsyncThunk('tags/tagsByNotes',async ({ id}: { id: string;})=>{
  const {data} = await axios.get(`tags/${id}`)
  return data
})
export const fecthTags = createAsyncThunk('/tags/getTags',async () =>{
  const {data} = await axios.get('/tags')
  return data
})
export const fetchTagsUpdate = createAsyncThunk('notes/updateNotes',async ({ id, tag }: { id: string; tag: string[] })=>{
  const {data} = await axios.patch(`tags/${id}`,tag)
  return data
})

export const fetchNoteCreate = createAsyncThunk(
  'notes/createNotes',
  async ({ tittle, description, completed, user }: { tittle: string; description: string; completed: boolean;  user: string }) => {
    const data = {
      tittle,
      description,
      completed,
   
      user,
    };

    const response = await axios.post(`notes/`, data);
    return response.data;
  }
);
export interface Note {
  _id: string;
  tittle: string;
  description: string;
  completed: boolean;
  tags: string[];
  user: string; 
  createdAt: string; 
  updatedAt: string; 
  __v: number;
}

export interface NotesState {
  notes: Note[],
  tags:string[]
  status:'loading'|'loaded'| 'error',
  myFunction: () => void;
}

const initialState: NotesState = {
  notes: [],
  tags:[],
  status:'loading',
  myFunction: () => {},
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    setMyFunction: (state, action: PayloadAction<() => void>) => {
      state.myFunction = action.payload;
    },

  },
  extraReducers:(builder)=>{
    builder
       //создание заметок
      .addCase(fetchNoteCreate.fulfilled,(state,action)=>{
        state.status = 'loaded'
        state.notes = action.payload
      })
      .addCase(fetchNoteCreate.rejected,(state,action)=>{
        state.status = 'error'
        state.notes = []
      })
      .addCase(fetchNoteCreate.pending,(state,action)=>{
        state.status = 'loading'
        state.notes = []
      })

      //выборка заметок
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'error'
        state.notes = []
      })
      .addCase(fetchNotes.pending, (state, action) => {
        state.status = 'loading'
        state.notes = []
      })
        //обновление заметок
      .addCase(fetchNotesUpdate.fulfilled, (state, action) => {
        state.status = 'loaded';
        const updatedNote = action.payload;
        const index = state.notes.findIndex((note) => note._id === updatedNote._id);
  
        if (index !== -1) {
          // Если заметка найдена, замените ее в массиве
          state.notes[index] = updatedNote;
        } else {
          // Если заметка не найдена, добавьте ее в массив
          state.notes.push(updatedNote);
        }
      })
      .addCase(fetchNotesUpdate.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(fetchNotesUpdate.pending, (state, action) => {
        // Обработка начала выполнения запроса обновления заметок
        state.status = 'loading';
      })
      .addCase(fecthTags.fulfilled,(state,action)=>{
          state.status='loaded'
          state.tags = action.payload
      })
      .addCase(fecthTags.pending,(state,action)=>{
        state.status='loading'
        state.tags = []
    })
    .addCase(fecthTags.rejected,(state,action)=>{
      state.status='error'
      state.tags = []
    })
    .addCase(fetchTagsByNotes.fulfilled,(state,action)=>{
        state.status='loaded'
        state.tags = action.payload
    })
    .addCase(fetchTagsByNotes.pending,(state,action)=>{
      state.status='loading'
      state.tags = []
    })
    .addCase(fetchTagsByNotes.rejected,(state,action)=>{
    state.status='error'
    state.tags = []
    })
    .addCase(fetchTagsUpdate.fulfilled, (state, action) => {
      state.status = 'loaded';
      const updatedTags = action.payload;
      const index = state.notes.findIndex((note) => note._id === updatedTags._id);

      if (index !== -1) {
        // Если заметка найдена, замените ее в массиве
        state.notes[index] = updatedTags;
      } else {
        // Если заметка не найдена, добавьте ее в массив
        state.notes.push(updatedTags);
      }
    })
    .addCase(fetchTagsUpdate.rejected, (state, action) => {
      state.status = 'error';
    })
    .addCase(fetchTagsUpdate.pending, (state, action) => {
      // Обработка начала выполнения запроса обновления заметок
      state.status = 'loading';
    })
  }
});

export const { addNote, removeNote,setMyFunction } = notesSlice.actions;

export default notesSlice.reducer;