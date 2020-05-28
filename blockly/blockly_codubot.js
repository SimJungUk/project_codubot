var MAGIC_CALLBACK_CODE = "function(){NEXT_BLOCKS}";

Blockly.Blocks.coduBot_init = {
    category: 'CoduBot',
    init: function () {
        this.appendDummyInput()
            .appendField('CoduBot Init');
        this.setColour(0);
        this.setNextStatement(true);
    }
}
Blockly.JavaScript.coduBot_init = function () {

 return "var move_queue=[];var move_stopped=true;var move_waitted=false;var move_job_number=0;var curr_callback_id;var move_curr_job;var move_start_time;var checked='checked'var unchecked='unchecked'var i2c=new I2C();i2c.setup({scl:D27,sda:D26,bitrate:100000});var FORWARD=0;var BACKWARD=1;var LEFT=2;var RIGHT=3;var LEFT_MOTOR=0;var RIGHT_MOTOR=1;var CLOCKWISE=0;var COUNTER_CLOCKWISE=1;var ir_adc=[0,0,0,0,0];var DIST_TO_ANGLE=33.645;var ROBOT_ANGLE_TO_WHEEL_ANGLE=3;function next_move_check(){if(move_queue.length>0){start_move_queue()}else{move_stopped=true}}function after_move_end(){move_curr_job.c();next_move_check()}function start_move_queue(){move_curr_job=move_queue.shift();move_curr_job.f();curr_callback_id=setTimeout(after_move_end,move_curr_job.t);move_stopped=false;move_start_time=Date.now()}function add_move_queue(ff,tt,cc){move_queue.push({f:ff,t:tt,c:cc,n:move_job_number++});if(move_stopped){start_move_queue()}}function cancel_curr_move(){if(move_stopped){return}robot_stop();clearTimeout(curr_callback_id);next_move_check()}function cancel_last_move(){if(move_stopped){return}if(move_queue.length>1){move_queue.pop()}else{cancel_curr_move()}}function cancel_all_move(){if(move_stopped){return}robot_stop();clearTimeout(curr_callback_id);move_stopped=true;move_queue=[]}function move_wait(){if(move_stopped||move_waitted){return}robot_stop();clearTimeout(curr_callback_id);var r_time=Date.now()-move_start_time;if(r_time<move_curr_job.t){move_curr_job.t=r_time}move_waitted=true}function move_resume(){if(move_waitted){curr_callback_id=setTimeout(after_move_end,move_curr_job.t);move_curr_job.f();move_start_time=Date.now();move_waitted=false}}function robot_move_dist(dir,vel,dist_cm){if((dir==FORWARD)||(dir==BACKWARD))i2c.writeTo(0x01,[0x02,4,dir,vel,Math.round(dist_cm*DIST_TO_ANGLE)>>8,Math.round(dist_cm*DIST_TO_ANGLE)&0x00FF,(4+dir+vel+(Math.round(dist_cm*33.645)>>8)+(Math.round(dist_cm*33.645)&0x00FF))&0xFF])}function robot_turn(dir,vel,angle,time){add_move_queue(function(){if((dir==LEFT)||(dir==RIGHT))i2c.writeTo(0x01,[0x02,4,dir,vel,(angle*ROBOT_ANGLE_TO_WHEEL_ANGLE)>>8,(angle*ROBOT_ANGLE_TO_WHEEL_ANGLE)&0x00FF,(4+dir+vel+((angle*ROBOT_ANGLE_TO_WHEEL_ANGLE)>>8)+((angle*ROBOT_ANGLE_TO_WHEEL_ANGLE)&0x00FF))&0xFF])},1000*time,robot_stop)}function robot_move_angle(dir,vel,angle,time){add_move_queue(function(){i2c.writeTo(0x01,[0x02,4,dir,vel,angle>>8,angle&0x00FF,(4+dir+vel+(angle>>8)+(angle&0x00FF))&0xFF])},time*1000,robot_stop)}function robot_stop(){i2c.writeTo(0x01,[0x02,5,(5)&0xFF])}function motor_move(motor,dir,vel,angle,wait){if(wait==true){i2c.writeTo(0x01,[1,1]);i2c.writeTo(0x01,[(motor==LEFT_MOTOR?12:13)]);while(i2c.readFrom(0x01,1)!=0){}}i2c.writeTo(0x01,[0x02,(motor==LEFT_MOTOR?1:2),dir,vel,angle>>8,angle&0x00FF,((motor==LEFT_MOTOR?1:2)+dir+vel+(angle>>8)+(angle&0x00FF))&0xFF]);if(wait==true){i2c.writeTo(0x01,[1,1]);i2c.writeTo(0x01,[(motor==LEFT_MOTOR?12:13)]);while(i2c.readFrom(0x01,1)!=1){}}}function motor_stop(motor){i2c.writeTo(0x01,[0x02,3,motor,(3+motor)&0xFF])};function robot_turn_square(time,count){for(var i=0;i<count*4;i++){robot_move_angle(0,0,0,time);robot_turn(2,0,90,1)}};var ir_adc_loop=setInterval(function(){i2c.writeTo(0x01,[1,10]);i2c.writeTo(0x01,[14]);var ir_i2c=i2c.readFrom(0x01,10);ir_adc=[((ir_i2c[0]*256)+ir_i2c[1]),((ir_i2c[2]*256)+ir_i2c[3]),((ir_i2c[4]*256)+ir_i2c[5]),((ir_i2c[6]*256)+ir_i2c[7]),((ir_i2c[8]*256)+ir_i2c[9])]},10);function robot_move_till_fall(){setInterval(function(){print(ir_adc[2]);robot_move_angle(1,0,0);if(ir_adc[2]>500){robot_stop();clearInterval()}},5)}function robot_move_cross(time){robot_move_angle(0,0,0,time);robot_turn(2,0,0,time);robot_move_angle(0,0,0,time);robot_move_angle(1,0,0,time*2);robot_move_angle(0,0,0,time);robot_turn(3,0,0,time);robot_move_angle(0,0,0,time);robot_move_angle(1,0,0,time*2)};function led_matrix(checkedStr){checkedStr=checkedStr.toString();print(checkedStr)var checkedArr=checkedStr.split(',');for(var i=0;i<checkedArr.length;i++){if(checkedArr[i]=='unchecked'){continue}i2c.writeTo(0x07,[0x02,2,i,255,0,0,(2+i+255+0+0)&0xFF])}}function robot_move_angle_no_time(dir,vel,angle){i2c.writeTo(0x01,[0x02,4,dir,vel,angle>>8,angle&0x00FF,(4+dir+vel+(angle>>8)+(angle&0x00FF))&0xFF])}\n"

}

Blockly.Blocks.robot_move_angle = {
    category: 'CoduBot',
    init: function () {
        this.appendDummyInput()
            .appendField('로봇 각도로 움직이기');
        this.appendValueInput('dir')
            .setCheck(['Number'])
            .appendField('방향');
        this.appendValueInput('vel')
            .setCheck(['Number'])
            .appendField('속도');
        this.appendValueInput('angle')
            .setCheck(['Number'])
            .appendField('각도');
        this.appendValueInput('time')
            .setCheck(['Number'])
            .appendField('시간');
        this.setColour(150);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.JavaScript.robot_move_angle = function () {
    var dir = Blockly.JavaScript.valueToCode(this, 'dir', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var vel = Blockly.JavaScript.valueToCode(this, 'vel', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var angle = Blockly.JavaScript.valueToCode(this, 'angle', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var time = Blockly.JavaScript.valueToCode(this, 'time', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    return `robot_move_angle(${dir}, ${vel}, ${angle}, ${time})\n`
}

Blockly.Blocks.robot_turn = {
    category: 'CoduBot',
    init: function () {
        this.appendDummyInput()
            .appendField('로봇 회전하기');
        this.appendValueInput('dir')
            .setCheck(['Number'])
            .appendField('방향');
        this.appendValueInput('vel')
            .setCheck(['Number'])
            .appendField('속도');
        this.appendValueInput('angle')
            .setCheck(['Number'])
            .appendField('각도');
        this.appendValueInput('time')
            .setCheck(['Number'])
            .appendField('시간');
        this.setColour(150);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.JavaScript.robot_turn = function () {
    var dir = Blockly.JavaScript.valueToCode(this, 'dir', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var vel = Blockly.JavaScript.valueToCode(this, 'vel', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var angle = Blockly.JavaScript.valueToCode(this, 'angle', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var time = Blockly.JavaScript.valueToCode(this, 'time', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    return `robot_turn(${dir}, ${vel}, ${angle}, ${time})`;
}

Blockly.Blocks.robot_stop = {
    category: 'CoduBot',
    init: function () {
        this.appendDummyInput()
            .appendField('로봇 멈추기');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(270);
    }
}

Blockly.JavaScript.robot_stop = function () {
    return `robot_stop()`;
}

Blockly.Blocks.robot_move_dist = {
    category: 'CoduBot',
    init: function () {
        this.appendDummyInput()
            .appendField('입력받은 거리만큼 로봇 움직이기');
        this.appendValueInput('dir')
            .setCheck(['Number'])
            .appendField('방향');
        this.appendValueInput('vel')
            .setCheck(['Number'])
            .appendField('속도');
        this.appendValueInput('dist_cm')
            .setCheck(['Number'])
            .appendField('거리');
        this.setColour(150);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.JavaScript.robot_move_dist = function () {
    var dir = Blockly.JavaScript.valueToCode(this, 'dir', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var vel = Blockly.JavaScript.valueToCode(this, 'vel', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var dist_cm = Blockly.JavaScript.valueToCode(this, 'dist_cm', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    return `robot_move_dist(${dir}, ${vel}, ${dist_cm})`
}

Blockly.Blocks.motor_move = {
    category: 'CoduBot',
    init: function () {
        this.appendDummyInput()
            .appendField('모터 움직이기');
        this.appendValueInput('motor')
            .setCheck(['Number'])
            .appendField('움직일 모터');
        this.appendValueInput('vel')
            .setCheck(['Number'])
            .appendField('속도');
        this.appendValueInput('angle')
            .setCheck(['Number'])
            .appendField('각도');
        this.setColour(150);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.JavaScript.motor_move = function () {
    var motor = Blockly.JavaScript.valueToCode(this, 'motor', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var vel = Blockly.JavaScript.valueToCode(this, 'vel', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var angle = Blockly.JavaScript.valueToCode(this, 'angle', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    return `motor_move(${motor}, ${vel}, ${angle})`
}

Blockly.Blocks.motor_stop = {
    category: 'CoduBot',
    init: function () {
        this.appendDummyInput()
            .appendField('모터 멈추기');
        this.appendValueInput('motor')
            .setCheck(['Number'])
            .appendField('멈출 모터');
        this.setColour(270);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.JavaScript.motor_stop = function () {
    var motor = Blockly.JavaScript.valueToCode(this, 'motor', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    return `motor_stop(${motor})`
}


Blockly.Blocks.robot_turn_square = {
    category: 'CoduBot',
    init: function () {
        this.appendDummyInput()
            .appendField('로봇 한바퀴 돌리기');
        this.appendValueInput('time')
            .setCheck(['Number'])
            .appendField('구동 시간');
        this.appendValueInput('count')
            .setCheck(['Number'])
            .appendField('회전 횟수');
        this.setColour(270);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}
Blockly.JavaScript.robot_turn_square = function () {
    var time = Blockly.JavaScript.valueToCode(this, 'time', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    var count = Blockly.JavaScript.valueToCode(this, 'count', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    return `robot_turn_square(${time}, ${count});`
}

Blockly.Blocks.robot_move_till_fall = {
    category : 'CoduBot',
    init : function() {
        this.appendDummyInput()
            .appendField('떨어지기 전까지 로봇 움직이기')
        this.setColour(270);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.JavaScript.robot_move_till_fall = function() {
    return `robot_move_till_fall();`
}

Blockly.Blocks.robot_move_cross = {
    category : 'CoduBot',
    init : function() {
        this.appendDummyInput()
            .appendField('로봇 십자모양으로 움직이기')
        this.appendValueInput('time')
            .setCheck(['Number'])
            .appendField('구동 시간');
        this.setColour(270);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.JavaScript.robot_move_cross = function () {
    var time = Blockly.JavaScript.valueToCode(this, 'time', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
    return `robot_move_cross(${time})`
}

Blockly.Blocks.line_trace = {
    category : 'CoduBot',
    init : function() {
        this.appendDummyInput()
            .appendField('라인 트레이싱')
        this.setColour(270);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.JavaScript.line_trace = function () {
    return `line_trace()\n;`
}

Blockly.Blocks['led_matrix'] = {
    init : function() {
        this.appendDummyInput()
        .appendField("colour : ")
        .appendField(new Blockly.FieldColour('#ff4040'), 'color-picker')
        this.appendDummyInput()
        .appendField('led matrix 켜기 : \n')
        this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox(false), `cb0`)
        .appendField(new Blockly.FieldCheckbox(false), `cb1`)
        .appendField(new Blockly.FieldCheckbox(false), `cb2`)
        .appendField(new Blockly.FieldCheckbox(false), `cb3`)
        .appendField(new Blockly.FieldCheckbox(false), `cb4`)
        .appendField(new Blockly.FieldCheckbox(false), `cb5`)
        .appendField(new Blockly.FieldCheckbox(false), `cb6`)
        this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox(false), `cb7`)
        .appendField(new Blockly.FieldCheckbox(false), `cb8`)
        .appendField(new Blockly.FieldCheckbox(false), `cb9`)
        .appendField(new Blockly.FieldCheckbox(false), `cb10`)
        .appendField(new Blockly.FieldCheckbox(false), `cb11`)
        .appendField(new Blockly.FieldCheckbox(false), `cb12`)
        .appendField(new Blockly.FieldCheckbox(false), `cb13`)
        this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox(false), `cb14`)
        .appendField(new Blockly.FieldCheckbox(false), `cb15`)
        .appendField(new Blockly.FieldCheckbox(false), `cb16`)
        .appendField(new Blockly.FieldCheckbox(false), `cb17`)
        .appendField(new Blockly.FieldCheckbox(false), `cb18`)
        .appendField(new Blockly.FieldCheckbox(false), `cb19`)
        .appendField(new Blockly.FieldCheckbox(false), `cb20`)
        this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox(false), `cb21`)
        .appendField(new Blockly.FieldCheckbox(false), `cb22`)
        .appendField(new Blockly.FieldCheckbox(false), `cb23`)
        .appendField(new Blockly.FieldCheckbox(false), `cb24`)
        .appendField(new Blockly.FieldCheckbox(false), `cb25`)
        .appendField(new Blockly.FieldCheckbox(false), `cb26`)
        .appendField(new Blockly.FieldCheckbox(false), `cb27`)
        this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox(false), `cb28`)
        .appendField(new Blockly.FieldCheckbox(false), `cb29`)
        .appendField(new Blockly.FieldCheckbox(false), `cb30`)
        .appendField(new Blockly.FieldCheckbox(false), `cb31`)
        .appendField(new Blockly.FieldCheckbox(false), `cb32`)
        .appendField(new Blockly.FieldCheckbox(false), `cb33`)
        .appendField(new Blockly.FieldCheckbox(false), `cb34`)
        this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox(false), `cb35`)
        .appendField(new Blockly.FieldCheckbox(false), `cb36`)
        .appendField(new Blockly.FieldCheckbox(false), `cb37`)
        .appendField(new Blockly.FieldCheckbox(false), `cb38`)
        .appendField(new Blockly.FieldCheckbox(false), `cb39`)
        .appendField(new Blockly.FieldCheckbox(false), `cb40`)
        .appendField(new Blockly.FieldCheckbox(false), `cb41`)
        this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox(false), `cb42`)
        .appendField(new Blockly.FieldCheckbox(false), `cb43`)
        .appendField(new Blockly.FieldCheckbox(false), `cb44`)
        .appendField(new Blockly.FieldCheckbox(false), `cb45`)
        .appendField(new Blockly.FieldCheckbox(false), `cb46`)
        .appendField(new Blockly.FieldCheckbox(false), `cb47`)
        .appendField(new Blockly.FieldCheckbox(false), `cb48`)
        this.setColour(270);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.JavaScript.led_matrix = function (block) {
    let checkedStr = ""
    for(var i = 0 ; i < 49; i++) {
        let val = block.getFieldValue(`cb${i}`)
        if(val === 'TRUE') {
            val='checked,'
        }
        else {
            val='unchecked,'
        }
        checkedStr+=val;
    }
    return `led_matrix(${checkedStr})`;
}