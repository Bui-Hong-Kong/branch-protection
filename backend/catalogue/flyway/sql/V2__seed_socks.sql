-- Classic WeaveSocks catalogue seed (idempotent-ish via INSERT IGNORE on sock PK).

INSERT IGNORE INTO sock (sock_id, name, description, price, count, image_url_1, image_url_2) VALUES
('a0a4f044-b040-410d-8ead-4de0446aec7e', 'Nerd leg', 'For all those leg lovers out there. A perfect example of a swivel chair trained calf. Meticulously trained on a diet of sitting and Pina Coladas. Phwarr...', 7.99, 115, '/catalogue/images/bit_of_leg_1.jpeg', '/catalogue/images/bit_of_leg_2.jpeg'),
('808a2de1-1aaa-4c25-a9b9-6612e8f29a38', 'Crossed', 'A mature sock, crossed, with an air of nonchalance.', 17.32, 738, '/catalogue/images/cross_1.jpeg', '/catalogue/images/cross_2.jpeg'),
('510a0d7e-8e83-4193-b483-e27e09ddc34d', 'SuperSport XL', 'Ready for action. Engineers: be ready to smash that next bug! Be ready, with these super-action-sport-masterpieces. This particular engineer was chased away from the office with a stick.', 15.00, 820, '/catalogue/images/puma_1.jpeg', '/catalogue/images/puma_2.jpeg'),
('03fef6ac-1896-4ce8-bd69-b798f85c6e0b', 'Holy', 'Socks fit for a Messiah. You too can experience walking in water with these special edition beauties. Each hole is lovingly proggled to leave smooth edges. The only sock approved by a higher power.', 99.99, 1, '/catalogue/images/holy_1.jpeg', '/catalogue/images/holy_2.jpeg'),
('d3588630-ad8e-49df-bbd7-3167f7efb246', 'YouTube.sock', 'We were not paid to sell this sock. It''s just a bit geeky.', 10.99, 801, '/catalogue/images/youtube_1.jpeg', '/catalogue/images/youtube_2.jpeg'),
('819e1fbf-8b7e-4f6d-811f-693534916a8b', 'Figueroa', 'enim officia aliqua excepteur esse deserunt quis aliquip nostrud anim', 14, 808, '/catalogue/images/WAT.jpg', '/catalogue/images/WAT2.jpg'),
('zzz4f044-b040-410d-8ead-4de0446aec7e', 'Classic', 'Keep it simple.', 12, 127, '/catalogue/images/classic.jpg', '/catalogue/images/classic2.jpg'),
('3395a43e-2d88-40de-b95f-e00e1502085b', 'Colourful', 'proident occaecat irure et excepteur labore minim nisi amet irure', 18, 438, '/catalogue/images/colourful_socks.jpg', '/catalogue/images/colourful_socks.jpg'),
('837ab141-399e-4c1f-9abc-bace40296bac', 'Cat socks', 'consequat amet cupidatat minim laborum tempor elit ex consequat in', 15, 175, '/catalogue/images/catsocks.jpg', '/catalogue/images/catsocks2.jpg');

-- Tags (fixed IDs so sock_tag FKs stay stable across fresh RDS)
INSERT IGNORE INTO tag (tag_id, name) VALUES
(1, 'brown'),
(2, 'geek'),
(3, 'formal'),
(4, 'blue'),
(5, 'skin'),
(6, 'red'),
(7, 'action'),
(8, 'sport'),
(9, 'black'),
(10, 'magic'),
(11, 'green');

INSERT IGNORE INTO sock_tag (sock_id, tag_id) VALUES
('a0a4f044-b040-410d-8ead-4de0446aec7e', 4),
('a0a4f044-b040-410d-8ead-4de0446aec7e', 5),
('808a2de1-1aaa-4c25-a9b9-6612e8f29a38', 4),
('808a2de1-1aaa-4c25-a9b9-6612e8f29a38', 6),
('808a2de1-1aaa-4c25-a9b9-6612e8f29a38', 7),
('808a2de1-1aaa-4c25-a9b9-6612e8f29a38', 3),
('510a0d7e-8e83-4193-b483-e27e09ddc34d', 8),
('510a0d7e-8e83-4193-b483-e27e09ddc34d', 9),
('510a0d7e-8e83-4193-b483-e27e09ddc34d', 3),
('03fef6ac-1896-4ce8-bd69-b798f85c6e0b', 10),
('03fef6ac-1896-4ce8-bd69-b798f85c6e0b', 7),
('d3588630-ad8e-49df-bbd7-3167f7efb246', 2),
('d3588630-ad8e-49df-bbd7-3167f7efb246', 3),
('819e1fbf-8b7e-4f6d-811f-693534916a8b', 3),
('819e1fbf-8b7e-4f6d-811f-693534916a8b', 11),
('819e1fbf-8b7e-4f6d-811f-693534916a8b', 4),
('zzz4f044-b040-410d-8ead-4de0446aec7e', 1),
('zzz4f044-b040-410d-8ead-4de0446aec7e', 11),
('3395a43e-2d88-40de-b95f-e00e1502085b', 1),
('3395a43e-2d88-40de-b95f-e00e1502085b', 4),
('837ab141-399e-4c1f-9abc-bace40296bac', 1),
('837ab141-399e-4c1f-9abc-bace40296bac', 11),
('837ab141-399e-4c1f-9abc-bace40296bac', 3);
