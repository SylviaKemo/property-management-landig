# Round 3: connector clips (4 jobs, the last round)

```
Use the Higgsfield connector to generate 4 videos. Rules:
- Model seedance_2_0, mode "std", resolution "720p", aspect_ratio "16:9", duration 5, generate_audio false.
- Set use_unlim: true on every request (free unlimited trial). Never spend credits.
- Each video has TWO medias: role "start_image" and role "end_image", with the IDs given below (already-uploaded images in my account).
- Use generate_video_batch if it accepts use_unlim, otherwise 4 separate generate_video calls.
- If a video comes back "nsfw" or failed, re-roll that one up to 2 more times (same settings). If it still fails, tell me.
- Wait until all finish, then reply with ONLY:
conn_1 = <job_id>
conn_2 = <job_id>
conn_3 = <job_id>
conn_4 = <job_id>

TAIL (add to the end of every prompt): One connected miniature clay world, seamless flowing aerial transition. Soft matte clay diorama, tilt-shift miniature, warm Nairobi light, honey yellow, amber, cream and charcoal palette with jacaranda purple and leaf green. Smooth graceful slow motion. No text, no captions.

conn_1: start_image = 972eb306-f2b0-464a-807f-49c5d765a160, end_image = 81f3fefd-e792-4d28-96f5-4dd1a06bf950
prompt: Single continuous cinematic camera move, no cuts. The camera smoothly rises up and over the front of the cream apartment building, lifting above its roof, then glides forward and arrives above a miniature cutaway of the shared kitchen and dining room, beginning to descend toward it. + TAIL

conn_2: start_image = 4dedd6a7-3302-4364-a477-e9f80bf8bcc4, end_image = 9f2af12c-79a4-49f0-a1e7-881d989d4575
prompt: Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of the shared kitchen and dining room, rising above it, then glides forward across the connected miniature apartment and arrives above a miniature cutaway of a calm, tidy furnished private room, empty and unoccupied, beginning to descend toward it. + TAIL

conn_3: start_image = 0236ed23-26d1-4aae-8cec-f99d6ba7cdd6, end_image = 436dfde7-2e81-4280-b211-07e5be675d86
prompt: Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of the calm private room past the window, rising above it, then glides forward over green treetops and arrives above a miniature cutaway of a clean washroom, laundry corner and sunny balcony, empty and unoccupied, beginning to descend toward it. + TAIL

conn_4: start_image = d4af819f-3a28-4adb-b2b5-c14829dd0b01, end_image = ac274b70-ae8e-4af0-b3ed-bc13dafe7f73
prompt: Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back from the sunny balcony, rising into the warm golden-hour sky above the treetops, then glides forward and arrives in front of the whole cream apartment building glowing at golden hour, beginning to descend toward it. + TAIL
```
