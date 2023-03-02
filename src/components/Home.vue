<template>
  <a-card style="width: 500px; overflow: auto">
    <p v-html="content"></p>
  </a-card>

  <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="API 密钥"
      name="apiKey"
      :rules="[{ required: true, message: '请输入 OpenAI API 密钥!' }]"
    >
      <a-input
        v-model:value="formState.apiKey"
        allow-clear
        @change="apiKeyOnchange"
      />
    </a-form-item>
    <a-form-item
      name="prompt"
      label="提问"
      :rules="[{ required: true, message: '请输入提问内容!' }]"
    >
      <a-textarea
        v-model:value="formState.prompt"
        placeholder="在这里输入提问内容"
        :rows="4"
      />
    </a-form-item>
    <a-button type="primary" html-type="submit" :loading="loading"
      >提交</a-button
    >
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from "vue";
import { array } from "vue-types";
import {
  getChatGPTResponse,
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../utils/index";

const content = ref<Messages | string>(
  "请在文本框中输入内容，复杂问题可能等待时间较长"
);
const loading = ref<boolean>(false);

interface FormState {
  prompt: string;
  apiKey: string;
}
type Messages = { role: string; content: string };
interface requestBodyState {
  messages: Messages[];
  model: string;
}

onBeforeMount(() => {
  const localApiKey = getLocalStorage("apiKey");
  if (localApiKey) {
    formState.apiKey = localApiKey;
  }
});

const formState = reactive<FormState>({
  prompt: "",
  apiKey: "",
});

const requestBody = reactive<requestBodyState>({
  messages: [],
  model: "gpt-3.5-turbo",
  // model: 'text-davinci-003',
});

const onFinish = (values: any) => {
  console.log("Success:", values);
  const { prompt, apiKey } = values;
  if (prompt.trim()) {
    response(prompt, apiKey);
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const response = async (prompt, apiKey) => {
  loading.value = true;
  requestBody.messages.push({
    role: "user",
    content: prompt,
  });
  try {
    const res: string = await getChatGPTResponse(requestBody, apiKey);
    // const str = res.split("\n\n");
    // console.log("str", str);
    console.log("res", res);

    content.value = res;
    requestBody.messages.push(JSON.parse(res));
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

const apiKeyOnchange = () => {
  console.log("on change");
  setLocalStorage("apiKey", formState.apiKey);
};

// response();
</script>