import { MigrationInterface, QueryRunner } from 'typeorm'

export class FakePost1623851258999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert into post (title, text, "creatorId") values ('General Manager', 'mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla', 1);
insert into post (title, text, "creatorId") values ('Mechanical Systems Engineer', 'vestibulum sit amet cursus id turpis integer aliquet massa id lobortis', 1);
insert into post (title, text, "creatorId") values ('Engineer III', 'vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci', 1);
insert into post (title, text, "creatorId") values ('Account Executive', 'vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum', 1);
insert into post (title, text, "creatorId") values ('Nurse Practicioner', 'viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere', 1);
insert into post (title, text, "creatorId") values ('Account Executive', 'eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed', 1);
insert into post (title, text, "creatorId") values ('Account Executive', 'quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea', 1);
insert into post (title, text, "creatorId") values ('Account Executive', 'auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras', 1);
insert into post (title, text, "creatorId") values ('Financial Advisor', 'magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient', 1);
insert into post (title, text, "creatorId") values ('Physical Therapy Assistant', 'duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi', 1);
insert into post (title, text, "creatorId") values ('Developer IV', 'feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id', 1);
insert into post (title, text, "creatorId") values ('Payment Adjustment Coordinator', 'et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent', 1);
insert into post (title, text, "creatorId") values ('Research Associate', 'vel augue vestibulum ante ipsum primis in faucibus orci luctus et', 1);
insert into post (title, text, "creatorId") values ('Senior Financial Analyst', 'eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien', 1);
insert into post (title, text, "creatorId") values ('Human Resources Assistant II', 'sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut', 1);
insert into post (title, text, "creatorId") values ('Geologist II', 'in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel', 1);
insert into post (title, text, "creatorId") values ('Safety Technician I', 'quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec', 1);
insert into post (title, text, "creatorId") values ('Product Engineer', 'duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium', 1);
insert into post (title, text, "creatorId") values ('Business Systems Development Analyst', 'amet lobortis sapien sapien non mi integer ac neque duis', 1);
insert into post (title, text, "creatorId") values ('Human Resources Assistant I', 'ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam', 1);
insert into post (title, text, "creatorId") values ('Food Chemist', 'ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque', 1);
insert into post (title, text, "creatorId") values ('Structural Engineer', 'nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa', 1);
insert into post (title, text, "creatorId") values ('Dental Hygienist', 'ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam', 1);
insert into post (title, text, "creatorId") values ('Electrical Engineer', 'sapien non mi integer ac neque duis bibendum morbi non quam nec dui', 1);
insert into post (title, text, "creatorId") values ('Senior Quality Engineer', 'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel', 1);
insert into post (title, text, "creatorId") values ('Financial Analyst', 'orci eget orci vehicula condimentum curabitur in libero ut massa volutpat', 1);
insert into post (title, text, "creatorId") values ('Director of Sales', 'blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus', 1);
insert into post (title, text, "creatorId") values ('Programmer Analyst II', 'faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna', 1);
insert into post (title, text, "creatorId") values ('Dental Hygienist', 'elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante', 1);
insert into post (title, text, "creatorId") values ('Cost Accountant', 'pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non', 1);
insert into post (title, text, "creatorId") values ('Web Developer II', 'est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat', 1);
insert into post (title, text, "creatorId") values ('Director of Sales', 'vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis', 1);
insert into post (title, text, "creatorId") values ('Executive Secretary', 'feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue', 1);
insert into post (title, text, "creatorId") values ('Quality Engineer', 'tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis', 1);
insert into post (title, text, "creatorId") values ('Database Administrator IV', 'vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus', 1);
insert into post (title, text, "creatorId") values ('Senior Editor', 'lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt', 1);
insert into post (title, text, "creatorId") values ('VP Marketing', 'malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim', 1);
insert into post (title, text, "creatorId") values ('Geologist IV', 'nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu', 1);
insert into post (title, text, "creatorId") values ('Sales Representative', 'suspendisse ornare consequat lectus in est risus auctor sed tristique in', 1);
insert into post (title, text, "creatorId") values ('Computer Systems Analyst I', 'vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia', 1);
insert into post (title, text, "creatorId") values ('Electrical Engineer', 'interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus', 1);
insert into post (title, text, "creatorId") values ('Programmer Analyst II', 'vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere', 1);
insert into post (title, text, "creatorId") values ('Electrical Engineer', 'sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum', 1);
insert into post (title, text, "creatorId") values ('Environmental Specialist', 'pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est', 1);
insert into post (title, text, "creatorId") values ('Statistician III', 'convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit', 1);
insert into post (title, text, "creatorId") values ('Assistant Professor', 'hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat', 1);
insert into post (title, text, "creatorId") values ('Accountant III', 'id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat', 1);
insert into post (title, text, "creatorId") values ('Staff Scientist', 'habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla', 1);
insert into post (title, text, "creatorId") values ('Senior Cost Accountant', 'maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam', 1);
insert into post (title, text, "creatorId") values ('Desktop Support Technician', 'integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue', 1);
insert into post (title, text, "creatorId") values ('Nurse', 'lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in', 1);
insert into post (title, text, "creatorId") values ('Executive Secretary', 'etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus', 1);
        `)
    }

    public async down(_: QueryRunner): Promise<void> {}
}
