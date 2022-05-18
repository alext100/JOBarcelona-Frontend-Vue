import HorizontalScroll from "./HorizontalScroll.vue";
import BaseCard from "./BaseCard.vue";

export default {
  title: "atoms/HorizontalScroll",
  component: HorizontalScroll,
  argTypes: {
    isMobile: {
      Boolean,
      control: "inline-radio",
      options: [true, false],
      description: "Whether user device is mobile",
    },
  },
};

const Template = (args) => ({
  components: { HorizontalScroll, BaseCard },
  setup() {
    return {
      args,
    };
  },
  template: `<HorizontalScroll v-bind='args'>
               <BaseCard hover> <template v-slot:body> Card 1 <br/> Lorem <br/> ipsum <br/> dolor</template> </BaseCard>
               <BaseCard hover> <template v-slot:body> Card 2 <br/> Lorem <br/> ipsum <br/> dolor</template> </BaseCard>
               <BaseCard hover> <template v-slot:body> Card 3 <br/> Lorem <br/> ipsum <br/> dolor</template> </BaseCard>
               <BaseCard hover> <template v-slot:body> Card 4 <br/> Lorem <br/> ipsum <br/> dolor</template> </BaseCard>
               <BaseCard hover> <template v-slot:body> Card 5 <br/> Lorem <br/> ipsum <br/> dolor</template> </BaseCard>
             </HorizontalScroll>`,
});

export const HorizontalScrollPC = Template.bind({});
HorizontalScrollPC.args = { isMobile: false };

export const HorizontalScrollMobile = Template.bind({});
HorizontalScrollMobile.args = { isMobile: true };
