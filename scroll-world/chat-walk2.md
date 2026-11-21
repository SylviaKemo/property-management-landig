# New walkthrough: hallway → kitchen → balcony (3 videos)

```
Use the Higgsfield connector to generate 3 videos, ONE AT A TIME: submit the first, wait until it has finished, then submit the next. My trial is rate-limited, so never submit two at once. If you get "rate limited", wait about a minute and retry that same one (up to 5 tries).

The images are ALREADY UPLOADED to my Higgsfield account. Do not ask me for files or URLs: pass these media IDs directly in medias[].value.

Settings for every video: model seedance_2_0, mode "std", resolution "720p", aspect_ratio "16:9", duration 8, generate_audio false, use_unlim: true. Never spend credits. Use generate_video (not the batch tool). If one comes back "nsfw" or failed, re-roll it up to 2 more times.

When all 3 are finished, reply with ONLY:
clip_1 = <job_id>
clip_2 = <job_id>
clip_3 = <job_id>

TAIL (add to the end of every prompt): Photorealistic real-estate walkthrough of a real Nairobi apartment, smooth steadicam, eye level, natural daylight. Keep every room exactly as it appears in the photos: same furniture, same walls, same tiles, no new objects, no people. Smooth, slow, graceful motion. No text, no captions.

clip_1: medias = [{role "start_image", value "30677844-f9db-49ef-a634-926305f657be"}, {role "end_image", value "047484e3-9524-4708-8325-173d8c27cf43"}]
prompt: Single continuous camera move, no cuts. The camera glides slowly forward down the narrow bright hallway with cream walls, wooden-look floor and a tall mirror on the right, lingering on the hallway, then in the final seconds moves through the wooden door at the end into the shared kitchen with orange mosaic tiles, white cabinets, a gas cooker, a tall fridge and a round table with dark wicker chairs, arriving at the view in the end image. + TAIL

clip_2: medias = [{role "start_image", value "047484e3-9524-4708-8325-173d8c27cf43"}, {role "end_image", value "1fba2fdb-5f23-45d3-888f-cd287a08c551"}]
prompt: Single continuous camera move, no cuts. The camera glides slowly through the shared kitchen past the round table, the gas cooker and the white cabinets under the big window, lingering on the kitchen, then in the final seconds turns gently to the right toward the corner with the microwave, the kettle and the water dispenser, where an open doorway leads out to a bright balcony, arriving at the view in the end image. + TAIL

clip_3: medias = [{role "start_image", value "1fba2fdb-5f23-45d3-888f-cd287a08c551"}]   (no end image)
prompt: Single continuous camera move, no cuts. The camera glides slowly forward through the open doorway in the orange-tiled kitchen and out onto the bright balcony with white floor tiles and a black curved iron railing, sunlight streaming in, revealing the neighbouring buildings and trees outside, then settles in a calm, steady view looking out over the railing. + TAIL
```
