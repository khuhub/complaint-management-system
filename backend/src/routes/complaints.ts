import express, {Request, Response} from 'express';
import { supabase } from '../supabaseClient';
import { verifyAdminJWT } from '../middleware/auth';

const router = express.Router();

interface ComplaintInput {
  name: string;
  email: string;
  complaint: string;
}

// POST / -> Submit a new complaint (public)
router.post(
  '/', 
  (async (req: Request<{}, {}, ComplaintInput>, res: Response): Promise<void> => {
    const { name, email, complaint } = req.body;
    if (!name || !email || !complaint) {
      res.status(400).json({ error: 'All fields are required.' });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('complaints')
        .insert([{ name, email, complaint, status: 'Pending' }])
        .select();

      if (error) {
        console.error('Error inserting complaint:', error.message);
        res.status(500).json({ error: error.message });
      } else {
        console.log('Complaint created:', data[0].id);
        res.status(201).json(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  })
);

// GET / -> Get all complaints (admin only)
router.get('/', verifyAdminJWT, async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching complaints:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// PATCH /:id -> Toggle status (admin only)
router.patch('/:id', verifyAdminJWT, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const { data: current, error: fetchError } = await supabase
      .from('complaints')
      .select('status')
      .eq('id', id)
      .single();

    if (fetchError || !current) {
      res.status(404).json({ error: 'Complaint not found.' });
      return;
    }

    const newStatus = current.status === 'Pending' ? 'Resolved' : 'Pending';
    const { data, error } = await supabase
      .from('complaints')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating status:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.log('Status updated:', id, newStatus);
      res.json(data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// DELETE /complaints/:id -> Delete a complaint (admin only)
router.delete('/:id', verifyAdminJWT, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase
    .from('complaints')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting complaint:', error.message);
    res.status(500).json({ error: error.message });
  } else {
    console.log('Complaint deleted:', id);
    res.status(204).send();
  }
});

export default router;
