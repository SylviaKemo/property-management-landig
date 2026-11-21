# Round 1: scene stills (5 jobs)

Copy everything below the line into a **new Claude chat on claude.ai** with the Higgsfield connector turned on.

---

Use the Higgsfield connector to generate 5 images. Rules:

- Model `gpt_image_2`, aspect_ratio `3:2`, resolution `2k`, quality `high`.
- Set **`use_unlim: true`** on every request. I'm on the free unlimited trial.
- Never spend credits. If `use_unlim` is rejected for these settings, check `models_explore` (unlim: true) for the settings the allowance covers, lower resolution or quality to match, and tell me what you changed.
- Use `generate_image_batch` if it accepts `use_unlim`. Otherwise make 5 separate `generate_image` calls.
- Wait for all of them to finish. Then reply with ONLY this list, in this exact format:

```
still_1 = <job_id>
still_2 = <job_id>
still_3 = <job_id>
still_4 = <job_id>
still_5 = <job_id>
```

Every prompt starts with the same style text (copy it exactly), followed by its own Subject line.

STYLE (identical in all 5):
Isometric low-poly 3D diorama floating as a small rounded island on a plain solid #F6F3EC cream background with a soft contact shadow beneath it. Soft matte clay 3D render, rounded toy-model shapes, gentle warm Nairobi afternoon light, soft long shadows, tilt-shift miniature look. Cohesive color palette of honey yellow #E8C13A, warm amber #D9A441, cream #F6F3EC, ink charcoal #141414, jacaranda purple #8E7CC3, leaf green #6E9A5B. Highly detailed, centered composition, absolutely no text, no letters, no numbers, no logos.

still_1 prompt = STYLE + " Subject: a leafy residential block in Kileleshwa, Nairobi: a modern five-storey cream apartment building with honey-yellow balconies and a flat roof with water tanks and solar panels, jacaranda trees in purple bloom along a quiet road, a small white minibus and a motorbike on the road, a gated entrance with a little guard booth, a few tiny residents walking toward the gate."

still_2 prompt = STYLE + " Subject: a cutaway miniature of a bright shared kitchen and dining room inside a modern apartment: open wooden shelves with jars, a gas cooker with a steaming pot, a tall fridge, a long wooden dining table with six chairs, pendant lamps, potted plants, three tiny housemates cooking and chatting around the counter."

still_3 prompt = STYLE + " Subject: a cutaway miniature of a cosy furnished private room in a shared apartment, empty and unoccupied: a neatly made bed with a honey-yellow throw, a study desk with a laptop and a desk lamp, a wardrobe, a soft rug, a small plant, a window with curtains looking out onto green treetops."

still_4 prompt = STYLE + " Subject: a cutaway miniature of a clean shared washroom, laundry corner and sunny balcony, empty and unoccupied: white tiles, a glass shower and a sink with a mirror, a washing machine and a drying rack with folded towels, and an open balcony with potted plants, two chairs and a small table overlooking green treetops."

still_5 prompt = STYLE + " Subject: the whole cream apartment building as a single hero centrepiece island at golden hour, warm light glowing in every window, honey-yellow balconies with plants, a welcoming front door with a short garden path lined with potted plants and a jacaranda tree, two tiny residents arriving home with bags."
