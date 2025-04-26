import Tesseract from 'tesseract.js'
import supabase from './supabaseClient'

export async function handleBillUpload(file, user_bike_id) {
  const result = await Tesseract.recognize(file, 'eng', {
    logger: m => console.log(m), // optional: logs progress
  });

  const text = result.data.text;
  console.log("Extracted Text:", text);

  // Basic parsing
  const service_name = text.match(/(Oil Change|Brake|Service|Chain|Air Filter|Engine)/i)?.[0] || 'Unknown'
  const price = parseInt(text.match(/(?:₹|Rs\.?)\s?(\d{2,5})/)?.[1] || '0')
  const notes = text.slice(0, 250)

  // Insert into Supabase
  const { error } = await supabase.from('maintenance_log').insert({
    user_bike_id,
    service_name,
    price,
    notes,
  })

  if (error) {
    console.error('Error inserting to Supabase:', error)
    return { success: false, error }
  }

  return { success: true }
}