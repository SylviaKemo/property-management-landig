# Round 2: dive clips (5 jobs)

Paste the block into a new Claude chat (claude.ai) with Higgsfield turned on.

```
Use the Higgsfield connector to generate 5 videos. Rules:
- Model seedance_2_0, mode "std", resolution "1080p", aspect_ratio "16:9", duration 8, generate_audio false.
- Set use_unlim: true on every request (free unlimited trial). Never spend credits. If use_unlim is rejected at 1080p, use the highest resolution the allowance covers (check models_explore with unlim: true) and tell me what you changed.
- Each video has ONE media: role "start_image", value = the job ID given below (these are finished image jobs from my account).
- Use generate_video_batch if it accepts use_unlim, otherwise 5 separate generate_video calls.
- If a video comes back "nsfw" or failed, re-roll that one up to 2 more times (same settings). If it still fails, tell me.
- Wait until all finish, then reply with ONLY:
dive_1 = <job_id>
dive_2 = <job_id>
dive_3 = <job_id>
dive_4 = <job_id>
dive_5 = <job_id>

TAIL (add to the end of every prompt): Soft matte clay diorama, tilt-shift miniature, warm Nairobi afternoon light, honey yellow, amber, cream and charcoal palette with jacaranda purple and leaf green. Smooth, graceful, slow motion, subtle parallax. No text, no captions.

dive_1: start_image = 9b2984c7-89dc-4078-8901-45bd5e1fcf37
prompt: Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole leafy Nairobi street block with the cream apartment building from outside like a tiny model. The camera slowly glides forward and descends along the road, past the purple jacaranda trees and the little minibus, sweeping in toward the gated entrance and the front of the building, as if arriving home. + TAIL

dive_2: start_image = 119eae3b-33db-4542-9e3a-4fed9c78475b
prompt: Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole miniature shared kitchen and dining room from outside like a tiny model. The camera slowly glides forward and descends toward the long wooden dining table and the housemates cooking at the counter, as if flying inside, the warm pendant lamps glowing. + TAIL

dive_3: start_image = 9ed4c391-61b7-4636-99be-309dbfabab19
prompt: Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole miniature furnished private room from outside like a tiny model; empty, unoccupied, no people, architectural and tasteful. The camera slowly glides forward and descends toward the study desk with the laptop and the window with green treetops, as if flying inside the calm, tidy room. + TAIL

dive_4: start_image = dc297a35-6923-430f-a680-5aa75baa0a29
prompt: Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole miniature washroom, laundry corner and sunny balcony from outside like a tiny model; empty, unoccupied, no people, architectural and tasteful. The camera slowly glides forward and descends past the washing machine toward the bright balcony with its plants and two chairs overlooking the treetops. + TAIL

dive_5: start_image = 5365efcd-d097-48b4-ab14-7f7f505a4b15
prompt: Single continuous cinematic camera move, no cuts. Begin high and far, looking at the whole cream apartment building island at golden hour from outside like a tiny model. The camera slowly glides forward and descends along the garden path toward the glowing front door, warm light in every window, as if being welcomed home. + TAIL
```
