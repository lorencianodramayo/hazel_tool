import React, { useEffect } from 'react';
import { Button, Form, Input  } from 'antd';
import axios from 'axios';

const options = {
    method: 'POST',
    url: 'https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '401c853a82msh51e465a40fad60bp176f4ejsnbc50da7b1640',
        'X-RapidAPI-Host': 'rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com'
    },
    data: '{"language":"ru","strength":3,"text":"Let the pain itself be a burden, for fear of the pleasures he has written, lest he should be rejected by reason, and all disagree, as life seems to be. That obstinacy of mine was so complete, that it would be a pain for the two of them. Do not count him at once, for the yard embraces them. He brings the learned into the right, and the enemy everywhere prevents them from concluding. My football felt like a democrite. Dont get honey conflicts, they slide in the power of someone else.And for thee, with those principles, the risks of mediocrity are so great.Do not be afraid to disagree brilliantly; They criticize you for the appearance of your offices, and for us the definition of bodies.Neither the case of the country of football, nor, as I understand it in truth, by which the football of the world is hindered.I hope that it will be concluded in such a way that it is also reproached for the discussion no.He will decide whether it is pleasure to choose, not my pains.And my ability to do so.I would not be able to do this with all my strength, if I were to live like this.Or the Greek attack to When you never mess with it.Eu honey was never mentioned in any way."}'
};

//en, af, sq, am, ar, hy, az, eu, be, bn, bs, bg, ca, ceb, ny, zh-cn, zh-tw, co, hr, cs, da, nl, eo, et, tl, fi, fr, fy, gl, ka, de, el, gu, ht, ha, haw, iw, hi, hmn, hu, is, ig, id, ga, it, ja, jw, kn, kk, km, ko, ku, ky, lo, la, lv, lt, lb, mk, mg, ms, ml, mt, mi, mr, mn, my, ne, no, ps, fa, pl, pt, ro, ru, sm, gd, sr, st, sn, sd, si, sk, sl, so, es, su, sw, sv, tg, ta, te, th, tr, uk, ur, uz, vi, cy, xh, yi, yo, zu, auto]
const CustomLanguage = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    })
  
    return (
        <Form
            layout={'vertical'}
            form={form}
        >
            <Form.Item label="Field A">
                <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Field B">
                <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default CustomLanguage;